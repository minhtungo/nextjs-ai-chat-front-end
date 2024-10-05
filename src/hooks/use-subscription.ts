import { currentSubscriptionAtom } from "@/atoms/subscription";
import { useAtomValue, useSetAtom } from "jotai";

export const useSubscription = () => {
  return {
    subscription: useAtomValue(currentSubscriptionAtom),
    setupSubscription: useSetAtom(currentSubscriptionAtom),
  };
};
