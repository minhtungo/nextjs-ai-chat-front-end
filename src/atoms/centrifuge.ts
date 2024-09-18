import { Centrifuge } from "centrifuge";
import { atom } from "jotai";

export const centrifugeAtom = atom<Centrifuge | null>(null);
