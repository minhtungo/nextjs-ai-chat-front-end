"use client";

import useWebsocket from "@/hooks/use-centrifuge";
import { SubscriptionState, SubscriptionStateContext } from "centrifuge";
import { User } from "next-auth";
import { FC, useState } from "react";

interface TestProps {
  user: User;
  chatId: string;
}

const Test: FC<TestProps> = ({ user, chatId }) => {
  const [realTimeStatus, setRealTimeStatus] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const onState = (ctx: SubscriptionStateContext) => {
    if (ctx.newState === SubscriptionState.Subscribed) {
      setRealTimeStatus("🟢");
    } else {
      setRealTimeStatus("🔴");
    }
  };

  const onPublication = (publication: any) => {
    setMessages((prevMessages) => [...prevMessages, publication]);
  };

  const channel = `chat`;

  const { publication, publishMessage } = useWebsocket({
    channel,
    userId: user?.id!,
    onState,
    onPublication,
  });

  console.log("cient", publication);

  return (
    <>
      <div className="">Status: {realTimeStatus}</div>
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
