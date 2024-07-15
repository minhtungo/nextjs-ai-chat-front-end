import { Message } from "@/types/chat";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export type ChatConfig = {
  subject: string | null;
  id: string | null;
  messages: Message[] | [];
};

export const chatInitialState: ChatConfig = {
  id: "",
  subject: "",
  messages: [],
};

const chatAtom = atom<ChatConfig>(chatInitialState);

const chatStore = () => {
  return {
    store: useAtom(chatAtom),
    getChat: useAtomValue(chatAtom),
    setChat: useSetAtom(chatAtom),
  };
};

export { chatStore };
