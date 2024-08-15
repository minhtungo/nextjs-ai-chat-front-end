import {
  chatAtom,
  docsAtom,
  imagesAtom,
  messagesAtom,
  selectedImageIndexAtom,
} from "@/atoms/chat";
import { useAtomValue, useSetAtom } from "jotai";

export const useChat = () => {
  return {
    chat: useAtomValue(chatAtom),
    setChat: useSetAtom(chatAtom),
    messages: useAtomValue(messagesAtom),
    setMessages: useSetAtom(messagesAtom),
    images: useAtomValue(imagesAtom),
    setImages: useSetAtom(imagesAtom),
    docs: useAtomValue(docsAtom),
    setDocs: useSetAtom(docsAtom),
    selectedImageIndex: useAtomValue(selectedImageIndexAtom),
    setSelectedImageIndex: useSetAtom(selectedImageIndexAtom),
  };
};
