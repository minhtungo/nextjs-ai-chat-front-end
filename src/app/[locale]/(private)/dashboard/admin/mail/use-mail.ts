import { Mail } from "@prisma/client";
import { atom, useAtom, useSetAtom, useAtomValue } from "jotai";

type Config = {
  selected: Mail["id"] | null;
};

const configAtom = atom<Config>({
  selected: null,
});

export function useMail() {
  return useAtom(configAtom);
}

export function useSetMail() {
  return useSetAtom(configAtom);
}

export function useGetMail() {
  return useAtomValue(configAtom);
}
