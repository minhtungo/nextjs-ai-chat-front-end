import { useAtomValue, useSetAtom } from "jotai";

import { centrifugeAtom } from "@/features/chat/store/use-centrifuge";
import { Subscription } from "centrifuge";
import { atom, type Setter } from "jotai";
import { toast } from "sonner";

const subscriptionAtom = atom<Subscription | null>(null);
const isSubscribedAtom = atom(false);

const currentSubscriptionAtom = atom(
  (get) => get(subscriptionAtom),
  async (get, set, channel: string) => {
    console.log("Current SubscriptionAtom", channel);
    const centrifuge = get(centrifugeAtom);
    const currentSub = get(subscriptionAtom);

    if (!centrifuge) {
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

export const useSubscription = () => {
  return {
    subscription: useAtomValue(currentSubscriptionAtom),
    setupSubscription: useSetAtom(currentSubscriptionAtom),
  };
};
