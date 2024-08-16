import { mailAtom } from "@/atoms/mail";
import { useAtomValue, useSetAtom } from "jotai";

export const useMail = () => {
  return {
    mail: useAtomValue(mailAtom),
    setMail: useSetAtom(mailAtom),
  };
};
