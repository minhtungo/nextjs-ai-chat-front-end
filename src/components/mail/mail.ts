import { Mail } from "@prisma/client";
import { atom } from "jotai";

type Config = {
  selected: Mail["id"] | null;
};

export const mailAtom = atom<Config>({
  selected: null,
});
