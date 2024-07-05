"use client";

import {
  getConnectionToken,
  getPublishMessageToken,
  getSubscriptionToken,
} from "@/use-cases/centrifugo";
import {
  Centrifuge,
  ErrorContext,
  State,
  StateContext,
  Subscription,
  SubscriptionState,
} from "centrifuge";
import { User } from "next-auth";
import { FC, useEffect, useState, useRef } from "react";

interface TestProps {
  user: User;
  chatId: string;
}

const Test: FC<TestProps> = ({ user, chatId }) => {
  const [realTimeStatus, setRealTimeStatus] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const subRef = useRef<Subscription>(null);
  const chatChannel = `chat`;

  const onPublication = (publication: any) => {
    setMessages((prevMessages) => [...prevMessages, publication]);
  };

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    let centrifuge: Centrifuge | null = null;

    const init = async () => {
      centrifuge = new Centrifuge(process.env.NEXT_PUBLIC_WS_ENDPOINT!, {
        getToken: getConnectionToken,
        debug: true,
      });

      const getChatChannelSubscriptionToken = async () => {
        return getSubscriptionToken(chatChannel);
      };

      let sub = centrifuge.getSubscription(chatChannel);
      if (!sub) {
        sub = centrifuge.newSubscription(chatChannel, {
          getToken: getChatChannelSubscriptionToken,
        });

        sub.on("publication", (ctx) => {
          console.log("publication", ctx.data);
          onPublication(ctx.data);
        });

        sub.on("state", (ctx) => {
          if (ctx.newState === SubscriptionState.Subscribed) {
            setRealTimeStatus("🟢");
          } else {
            setRealTimeStatus("🔴");
          }
        });

        sub.on("error", (err) => {
          console.log("error", err);
        });

        sub.subscribe();
      } else if (sub.state === SubscriptionState.Unsubscribed) {
        sub.subscribe();
      }
      subRef.current = sub;

      centrifuge.on("error", (err: ErrorContext) => {
        console.log("error", err);
      });

      // set up listeners for state change
      centrifuge.on("state", (message: StateContext) => {
        console.log("state", message);
      });

      centrifuge.on("connected", (ctx) => {
        console.log(`connected ${ctx}`);
      });

      centrifuge.on("disconnected", (ctx) => {
        console.log(`disconnected: ${ctx.code}, ${ctx.reason}`);
      });

      if (centrifuge.state === State.Disconnected) {
        centrifuge.connect();
      }
      console.log("centrifugo", centrifuge);
    };

    // As soon as we get authenticated user – init our app.
    init();

    return () => {
      if (centrifuge) {
        centrifuge?.disconnect();
      }
    };
  }, [user]);

  const publishMessage = async (message: string) => {
    const token = await getPublishMessageToken(chatChannel, message);

    const sub = subRef.current;

    console.log("centrifugo in publish message", sub);

    if (sub) {
      const result = await sub.publish({
        message: "asd",
      });

      console.log("result", result);
    } else {
      console.error("Centrifugo instance is not initialized");
    }

    // const result = await centrifugo.publish(chatChannel, {
    //   message,
    // });

    // console.log("result", result);
  };

  return (
    <>
      Status: {realTimeStatus}
      Messages: {JSON.stringify(messages)}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("publish", message);
          await publishMessage(message);
        }}
      >
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Publish</button>
      </form>
    </>
  );
};

export default Test;
