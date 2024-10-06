import { chatIdAtom, chatInfoAtom, chatUserIdAtom } from "@/atoms/chat";
import { useAtomValue, useSetAtom } from "jotai";

export const useChatInfo = () => {
  return {
    chatId: useAtomValue(chatIdAtom),
    setChatId: useSetAtom(chatIdAtom),
    chatUserId: useAtomValue(chatUserIdAtom),
    setChatUserId: useSetAtom(chatUserIdAtom),
    chatInfo: useAtomValue(chatInfoAtom),
  };
};
