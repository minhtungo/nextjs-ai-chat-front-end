import { Centrifuge } from "centrifuge";

import { atom, useAtom } from "jotai";

const centrifugeAtom = atom<Centrifuge | null>(null);

export const useCentrifuge = () => useAtom(centrifugeAtom);
