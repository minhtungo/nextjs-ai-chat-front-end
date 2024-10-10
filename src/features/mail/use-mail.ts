import { Mail } from "@prisma/client";
import { atom, useAtomValue, useSetAtom } from "jotai";

type Config = {
  selected: Mail["id"] | null;
};

const mailAtom = atom<Config>({
  selected: null,
});

export const useMail = () => {
  return {
    mail: useAtomValue(mailAtom),
    setMail: useSetAtom(mailAtom),
  };
};
