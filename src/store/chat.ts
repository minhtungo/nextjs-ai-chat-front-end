import { Message } from "@/types/chat";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export type ChatConfig = {
  id: string | null;
  title?: string;
  subject: string | null;
  messages: Message[] | [];
  overlay: {
    isOpen: boolean;
    selectedImage: string | null;
    selectedImageIndex: number | null;
  };
  isEditingTitle?: boolean;
};

export const chatInitialState: ChatConfig = {
  id: "",
  subject: "",
  title: "",
  messages: [],
  overlay: {
    isOpen: false,
    selectedImage: null,
    selectedImageIndex: null,
  },
  isEditingTitle: false,
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
