import {
  docsAtom,
  imagesAtom,
  updateSelectedDocIndexAtom,
  selectedDocIndexAtom,
  selectedImageIndexAtom,
  updateSelectedImageIndexAtom,
  chatSearchModeAtom,
  chatInfoAtom,
  focusedImageAtom,
} from "@/atoms/chat";

import { useAtomValue, useSetAtom } from "jotai";

export const useChat = () => {
  return {
    chatInfo: useAtomValue(chatInfoAtom),
    setChatInfo: useSetAtom(chatInfoAtom),
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
    focusedImage: useAtomValue(focusedImageAtom),
    setFocusedImage: useSetAtom(focusedImageAtom),
  };
};
