import {
  docsAtom,
  imagesAtom,
  selectedImageIndexAtom,
  selectedImageIndexFinderAtom,
} from "@/atoms/chat";
import { useAtomValue, useSetAtom } from "jotai";

export const useChat = () => {
  return {
    images: useAtomValue(imagesAtom),
    docs: useAtomValue(docsAtom),
    selectedImageIndex: useAtomValue(selectedImageIndexAtom),
    setSelectedImageIndex: useSetAtom(selectedImageIndexAtom),
    updateImageIndex: useSetAtom(selectedImageIndexFinderAtom),
  };
};
