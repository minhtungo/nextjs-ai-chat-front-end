import { Message } from "@/types/chat";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

type ChatConfig = {
  subject: string | null;
  id: string | null;
  messages: Message[] | [];
};

const chatAtom = atom<ChatConfig>({
  id: "",
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
