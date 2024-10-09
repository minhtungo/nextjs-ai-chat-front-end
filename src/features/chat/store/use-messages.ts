import { messagesAtom } from "@/features/chat/store/use-chat";
import { useAtomValue, useSetAtom } from "jotai";

export const useMessages = () => {
  return {
    messages: useAtomValue(messagesAtom),
    setMessages: useSetAtom(messagesAtom),
  };
};
