import { Message } from "@/types/chat";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

type ChatConfig = {
  subject: string;
  messages?: Message[];
};

const chatAtom = atom<ChatConfig>({
  subject: "",
  messages: [],
});

const chatStore = () => {
  return {
    store: useAtom(chatAtom),
    getChat: useAtomValue(chatAtom),
    setChat: useSetAtom(chatAtom),
  };
};

export { chatStore };
