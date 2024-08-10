import { atom, useAtomValue, createStore } from "jotai";

const store = createStore();

const tokenAtom = atom<string | null>(null);
