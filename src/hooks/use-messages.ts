import { messagesAtom } from "@/atoms/chat";
import { useAtomValue, useSetAtom } from "jotai";

export const useMessages = () => {
  return {
    messages: useAtomValue(messagesAtom),
    setMessages: useSetAtom(messagesAtom),
  };
};
