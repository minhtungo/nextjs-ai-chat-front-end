import { Centrifuge, Subscription } from "centrifuge";

import { atom, useAtom } from "jotai";

const centrifugeAtom = atom<Centrifuge | null>(null);
const subscriptionAtom = atom<Subscription | null>(null);

export const useCentrifuge = () => useAtom(centrifugeAtom);
export const useSubscription = () => useAtom(subscriptionAtom);
