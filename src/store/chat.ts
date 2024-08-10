import { IFile, MessageStore } from "@/types/chat";
import { atom, useAtomValue, useSetAtom } from "jotai";

export type ChatConfig = {
  id: string | null;
  title?: string;
  subject: string | null;
  selectedImageIndex: number | null;
  isEditingTitle?: boolean;
};

export const chatInitialState: ChatConfig = {
  id: "",
  subject: "",
  title: "",
  selectedImageIndex: null,
  isEditingTitle: false,
};

const chatAtom = atom<ChatConfig>(chatInitialState);
const chatDocsAtom = atom<IFile[]>([]);
const chatImagesAtom = atom<IFile[]>([]);
const messagesAtom = atom<MessageStore[]>([]);

const chatStore = () => {
  return {
    chat: useAtomValue(chatAtom),
    setChat: useSetAtom(chatAtom),
    chatDocs: useAtomValue(chatDocsAtom),
    setChatDocs: useSetAtom(chatDocsAtom),
    chatImages: useAtomValue(chatImagesAtom),
    setChatImages: useSetAtom(chatImagesAtom),
    messages: useAtomValue(messagesAtom),
    setMessages: useSetAtom(messagesAtom),
  };
};

export { chatStore };
