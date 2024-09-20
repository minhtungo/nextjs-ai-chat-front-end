import {
  docsAtom,
  imagesAtom,
  updateSelectedDocIndexAtom,
  selectedDocIndexAtom,
  selectedImageIndexAtom,
  updateSelectedImageIndexAtom,
  chatSearchModeAtom,
} from "@/atoms/chat";

import { useAtomValue, useSetAtom } from "jotai";

export const useChat = () => {
  return {
    chatSearchMode: useAtomValue(chatSearchModeAtom),
    setChatSearchMode: useSetAtom(chatSearchModeAtom),
    images: useAtomValue(imagesAtom),
    docs: useAtomValue(docsAtom),
    selectedImageIndex: useAtomValue(selectedImageIndexAtom),
    setSelectedImageIndex: useSetAtom(selectedImageIndexAtom),
    updateImageIndex: useSetAtom(updateSelectedImageIndexAtom),
    updateDocIndex: useSetAtom(updateSelectedDocIndexAtom),
    selectedDocIndex: useAtomValue(selectedDocIndexAtom),
    setSelectedDocIndex: useSetAtom(selectedDocIndexAtom),
  };
};
