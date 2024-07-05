import {
  getConnectionToken,
  getPublishMessageToken,
  getSubscriptionToken,
} from "@/use-cases/centrifugo";
import {
  PublicationContext,
  SubscribedContext,
  UnsubscribedContext,
  SubscriptionStateContext,
  ErrorContext,
  LeaveContext,
  SubscribingContext,
  JoinContext,
  SubscriptionState,
  Centrifuge,
  StateContext,
  State,
  Subscription,
} from "centrifuge";
import { useEffect, useRef, useState } from "react";

interface useWebsocketProps {
  channel: string;
  userId: string;
  onPublication?: (message: PublicationContext) => void;
  onState?: (state: SubscriptionStateContext) => void;
  onError?: (error: ErrorContext) => void;
  onSubscribed?: (message: SubscribedContext) => void;
  onUnsubscribed?: (message: UnsubscribedContext) => void;
  onSubscribing?: (message: SubscribingContext) => void;
  onJoin?: (message: JoinContext) => void;
  onLeave?: (message: LeaveContext) => void;
}

/**
 * @description hook to handle websocket subscription based on channel. Assumes that the channel being subscribed to is a protected channel
 * @link https://centrifugal.dev
 */
const useWebsocket = ({
  channel,
  userId,
  onPublication,
  onState,
  onError,
  onSubscribed,
  onUnsubscribed,
  onSubscribing,
  onJoin,
  onLeave,
}: useWebsocketProps) => {
  const [connectionError, setConnectionError] = useState<ErrorContext | null>(
    null,
  );
  const [subscriptionError, setSubscriptionError] =
    useState<ErrorContext | null>(null);

  const [websocketState, setWebsocketState] = useState<StateContext | null>(
    null,
  );

  const [subscriptionState, setSubscriptionState] =
    useState<SubscriptionStateContext | null>(null);

  const [publication, setPublication] = useState<PublicationContext | null>(
    null,
  );

  const [join, setJoin] = useState<JoinContext | null>(null);

  const [leave, setLeave] = useState<LeaveContext | null>(null);

  let centrifuge: Centrifuge | null = null;
  let sub: Subscription | null = null;

  const subRef = useRef<Subscription>(null);

  useEffect(() => {
    if (!channel || !userId) return;

    centrifuge = new Centrifuge(process.env.NEXT_PUBLIC_WS_ENDPOINT!, {
      getToken: getConnectionToken,
      debug: true,
    });

    const getChannelSubscriptionToken = async () => {
      return getSubscriptionToken(channel);
    };

    sub = centrifuge.getSubscription(channel);

    if (sub) {
      if (sub.state === SubscriptionState.Unsubscribed) {
        sub.subscribe();
      }
    } else if (!sub) {
      sub = centrifuge.newSubscription(channel, {
        getToken: getChannelSubscriptionToken,
      });
    }

    centrifuge.on("error", (err: ErrorContext) => {
      setConnectionError(err);
    });

    centrifuge.on("state", (ctx: StateContext) => {
      setWebsocketState(ctx);
    });

    centrifuge.on("connected", (ctx) => {
      console.log(`connected ${ctx}`);
    });

    centrifuge.on("disconnected", (ctx) => {
      console.log(`disconnected: ${ctx.code}, ${ctx.reason}`);
    });

    sub.on("publication", (ctx) => {
      setPublication(ctx.data);
      if (onPublication) {
        onPublication(ctx.data);
      }
    });

    sub.on("subscribed", (ctx) => {
      if (onSubscribed) {
        onSubscribed(ctx);
      }
    });

    sub.on("unsubscribed", (ctx) => {
      if (onUnsubscribed) {
        onUnsubscribed(ctx);
      }
    });

    sub.on("subscribing", (ctx) => {
      if (onSubscribing) {
        onSubscribing(ctx);
      }
    });

    sub.on("state", (ctx) => {
      setSubscriptionState(ctx);
      if (onState) {
        onState(ctx);
      }
    });

    sub.on("error", (err) => {
      if (onError) {
        onError(err);
      }
      setSubscriptionError(err);
    });

    sub.on("join", (ctx) => {
      setJoin(ctx);
      if (onJoin) {
        onJoin(ctx);
      }
    });

    sub.on("leave", (ctx) => {
      setLeave(ctx);
      if (onLeave) {
        onLeave(ctx);
      }
    });

    subRef.current = sub;

    // only subscribe if subscription is not subscribed and app is active
    if (sub.state === SubscriptionState.Unsubscribed) {
      sub.subscribe();
    }

    // only connect to a client that is disconnected
    if (centrifuge.state === State.Disconnected) {
      centrifuge.connect();
    }

    return () => {
      if (centrifuge) {
        centrifuge.disconnect();
        // centrifuge.removeAllListeners();
      }
      //   if (sub) {
      //     sub.unsubscribe();
      //     sub.removeAllListeners();
      //   }
    };
  }, [channel]);

  const publishMessage = async (message: string) => {
    const token = await getPublishMessageToken(channel, message);

    console.log("centrifugo in publish message", sub);

    if (subRef.current) {
      const result = await subRef.current.publish({
        token,
      });

      console.log("result", result);
    } else {
      console.error("Centrifugo instance is not initialized");
    }
  };
  return {
    connectionError,
    subscriptionError,
    websocketState,
    subscriptionState,
    publication,
    join,
    leave,
    publishMessage,
  };
};

export default useWebsocket;
