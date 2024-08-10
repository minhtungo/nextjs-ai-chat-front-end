import { getTokenAction } from "@/actions/api";
import { Centrifuge, Subscription } from "centrifuge";
import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";

export const centrifugeAtom = atom<Centrifuge | null>(null);

export const subscriptionAtom = atom<Subscription | null>(null);
// const subscriptionAtom = atom<Map<string, Subscription>>(new Map());

export const useCentrifuge = () => {
  const [centrifuge, setCentrifuge] = useAtom(centrifugeAtom);

  useEffect(() => {
    if (!centrifuge) {
      (async () => {
        const [data] = await getTokenAction();

        const newCentrifuge = new Centrifuge(
          process.env.NEXT_PUBLIC_WS_ENDPOINT!,
          {
            data,
            debug: true,
          },
        );

        newCentrifuge.on("connected", (ctx) => {
          console.log("Centrifuge connected:", ctx);
        });

        newCentrifuge.on("error", (ctx) => {
          console.error("Centrifuge error:", ctx.error);
        });

        if (newCentrifuge.state === "disconnected") {
          newCentrifuge.connect();
        }

        setCentrifuge(newCentrifuge);
      })();

      // Cleanup on component unmount or centrifuge change
      //   return () => {
      //     newCentrifuge.disconnect();
      //     setCentrifuge(null);
      //   };
    }
  }, []);

  return centrifuge;
};

export const useSubscription = (channel: string) => {
  const centrifuge = useCentrifuge();
  const [sub, setSub] = useAtom(subscriptionAtom);

  const cleanup = () => {
    if (sub) {
      sub.unsubscribe();
      sub.removeAllListeners();
      setSub(null);
    }
  };

  const setupSubscriptionListeners = async (newSub: Subscription) => {
    newSub.on("subscribed", (ctx) => {
      console.log("Successfully subscribed to channel:", channel);
    });

    newSub.on("unsubscribed", () =>
      console.log("Unsubscribed from channel:", channel),
    );
    newSub.on("error", (ctx) => console.log("Subscription error:", ctx));

    newSub.on("publication", (ctx) =>
      console.log("Received publication:", JSON.stringify(ctx.data)),
    );
  };

  useEffect(() => {
    let active = true;

    const subscribeToChannel = async () => {
      if (!centrifuge || !active) return;

      cleanup();

      // const getChannelSubscriptionToken = async () => {
      //   return getSubscriptionToken(channel);
      // };

      let newSub = centrifuge.getSubscription(channel);

      if (!newSub) {
        newSub = centrifuge.newSubscription(channel, {});
        await setupSubscriptionListeners(newSub);
      }

      newSub.subscribe();
      setSub(newSub);
    };

    subscribeToChannel();

    return () => {
      active = false;
      cleanup();
    };
  }, [channel, centrifuge]);

  return sub;
};

export const useSub = () => useAtomValue(subscriptionAtom);
