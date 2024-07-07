import { Message } from "@/types/chat";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

const chatAtom = atom<Message[]>([]);

export function useChat() {
  return useAtom(chatAtom);
}

export function useSetChat() {
  return useSetAtom(chatAtom);
}

export function useGetChat() {
  return useAtomValue(chatAtom);
}
