import { encodeDataAction } from "@/actions/centrifuge";
import { parseMessages } from "@/lib/utils";
import { getSubscriptionToken } from "@/use-cases/centrifuge";
import { Centrifuge, Subscription } from "centrifuge";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const centrifugeAtom = atom<Centrifuge | null>(null);

const subscriptionAtom = atom<Subscription | null>(null);
// const subscriptionAtom = atom<Map<string, Subscription>>(new Map());

export const useCentrifuge = () => {
  const [centrifuge, setCentrifuge] = useAtom(centrifugeAtom);

  useEffect(() => {
    if (!centrifuge) {
      (async () => {
        console.log("running centrifuge");
        const [data] = await encodeDataAction();
        const newCentrifuge = new Centrifuge(
          process.env.NEXT_PUBLIC_WS_ENDPOINT!,
          {
            debug: true,
            data,
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

      const newSub =
        centrifuge.getSubscription(channel) ||
        centrifuge.newSubscription(channel);

      await setupSubscriptionListeners(newSub);

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
