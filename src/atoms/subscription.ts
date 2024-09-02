import { subscribedCentrifugeAtom } from "@/atoms/centrifuge";
import { Subscription } from "centrifuge";
import { atom, type Setter } from "jotai";
import { toast } from "sonner";

export const subscriptionAtom = atom<Subscription | null>(null);
export const isSubscribedAtom = atom(false);

export const currentSubscriptionAtom = atom(
  (get) => get(subscriptionAtom),
  async (get, set, channel: string) => {
    console.log("Current SubscriptionAtom", channel);
    const centrifuge = get(subscribedCentrifugeAtom);
    const currentSub = get(subscriptionAtom);

    if (!centrifuge) {
      console.log("Current SubscriptionAtom centrifuge is null", channel);
      toast.error("Please connect to the centrifuge network");
      return;
    }

    console.log("Current SubscriptionAtom below IF", channel);

    if (currentSub) {
      console.log("Cleaning up subscription:", currentSub);
      currentSub.unsubscribe();
      currentSub.removeAllListeners();
    } else {
      console.log("No Clean up", currentSub);
    }

    let newSub = centrifuge.getSubscription(channel);

    if (!newSub) {
      newSub = centrifuge.newSubscription(channel, {});
    }

    await setupSubscriptionListeners({
      newSub,
      channel,
      set,
    });

    newSub.subscribe();
    set(subscriptionAtom, newSub);

    return newSub;
  },
);

// currentSubscriptionAtom.onMount = (setAtom) => {
//   console.log("----Current SubscriptionAtom .onMount");
//   setAtom("asd");
// };

const setupSubscriptionListeners = async ({
  newSub,
  channel,
  set,
}: {
  newSub: Subscription;
  channel: string;
  set: Setter;
}) => {
  newSub.on("subscribed", (ctx) => {
    console.log("Successfully subscribed to channel:", channel);
    set(isSubscribedAtom, true);
    toast.success("Subscribed to the chat");
  });

  newSub.on("unsubscribed", () => {
    console.log("Unsubscribed from channel:", channel);
  });

  newSub.on("subscribing", () => {
    console.log("Subscribing to channel:", channel);
    set(isSubscribedAtom, false);
  });

  newSub.on("error", (ctx) => {
    console.log("Subscription error:", ctx);
  });

  newSub.on("publication", (ctx) =>
    console.log("Received publication:", JSON.stringify(ctx.data)),
  );
};
