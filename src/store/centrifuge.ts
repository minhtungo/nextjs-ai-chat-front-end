import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { Centrifuge, Subscription, SubscriptionState } from "centrifuge";
import { encodeDataAction } from "@/actions/centrifuge";
import { getSubscriptionToken } from "@/use-cases/centrifuge";

const centrifugeAtom = atom<Centrifuge | null>(null);

const subscriptionAtom = atom<Subscription | null>(null);
// const subscriptionAtom = atom<Map<string, Subscription>>(new Map());

export const useCentrifuge = () => {
  const [centrifuge, setCentrifuge] = useAtom(centrifugeAtom);

  useEffect(() => {
    if (!centrifuge) {
      (async () => {
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
  if (!centrifuge) return;

  useEffect(() => {
    if (!sub) {
      const getChannelSubscriptionToken = async () => {
        return getSubscriptionToken(channel);
      };
      let newSub = centrifuge.getSubscription(channel);

      if (newSub) {
        if (newSub.state === SubscriptionState.Unsubscribed) {
          newSub.subscribe();
        }
      } else if (!newSub) {
        newSub = centrifuge.newSubscription(channel, {});
        newSub.subscribe();
      }

      newSub.on("subscribed", (ctx) => {
        console.log(`sub subscribed ${ctx}`);
      });

      newSub.on("unsubscribed", (ctx) => {
        console.log(`sub unsubscribed ${ctx}`);
      });

      newSub.on("error", (ctx) => {
        console.log(`sub error ${ctx}`);
      });

      newSub.on("state", (ctx) => {
        console.log(`sub state ${ctx}`);
      });

      newSub.on("join", (ctx) => {
        console.log(`sub join ${ctx}`);
      });

      newSub.on("leave", (ctx) => {
        console.log(`sub leave ${ctx}`);
      });

      newSub.on("publication", (ctx) => {
        console.log(`sub publication 2 ${JSON.stringify(ctx.data, null, 2)}`);
      });

      setSub(newSub);
    }
  }, [channel, centrifuge]);

  return sub;
};

// export const useSubscription = (channel: string) => {
//   const centrifuge = useAtomValue(centrifugeAtom);
//   const [sub, setSub] = useAtom(subscriptionAtom);

//   if (!centrifuge) return;

//   useEffect(() => {
//     if (!sub) {
//     }
//     if (centrifuge && !subscriptions.get(channel)) {
//       const subscription = centrifuge.subscribe(channel, (message) => {
//         console.log("Message received on channel", channel, message);
//       });

//       setSubscriptions((prev) => new Map(prev.set(channel, subscription)));

//       return () => {
//         subscription.unsubscribe();
//         setSubscriptions((prev) => {
//           const newMap = new Map(prev);
//           newMap.delete(channel);
//           return newMap;
//         });
//       };
//     }
//   }, [centrifuge, channel, subscriptions, setSubscriptions]);

//   return subscriptions.get(channel);
// };
