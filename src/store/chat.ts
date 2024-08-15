import { AtomFile, MessageStore } from "@/types/chat";
import { atom, useAtomValue, useSetAtom } from "jotai";

export type ChatConfig = {
  id: string | null;
  selectedImageIndex: number | null;
};

export const chatInitialState: ChatConfig = {
  id: "",
  selectedImageIndex: null,
};

const chatAtom = atom<ChatConfig>(chatInitialState);
const chatDocsAtom = atom<AtomFile[]>([]);
const chatImagesAtom = atom<AtomFile[]>([]);
const messagesAtom = atom<MessageStore[]>([]);

const isChatWithinTokenLimitAtom = atom<number | false>(1);

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
    isChatWithinTokenLimit: useAtomValue(isChatWithinTokenLimitAtom),
    setIsChatWithinTokenLimit: useSetAtom(isChatWithinTokenLimitAtom),
  };
};

export { chatStore };
