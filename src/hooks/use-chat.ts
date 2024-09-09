import {
  docsAtom,
  guestIdAtom,
  imagesAtom,
  selectedDocIndexFinderAtom,
  selectedDocIndexAtom,
  selectedImageIndexAtom,
  selectedImageIndexFinderAtom,
} from "@/atoms/chat";

import { useAtomValue, useSetAtom } from "jotai";

export const useChat = () => {
  return {
    guestId: useAtomValue(guestIdAtom),
    setGuestId: useSetAtom(guestIdAtom),
    images: useAtomValue(imagesAtom),
    docs: useAtomValue(docsAtom),
    selectedImageIndex: useAtomValue(selectedImageIndexAtom),
    setSelectedImageIndex: useSetAtom(selectedImageIndexAtom),
    updateImageIndex: useSetAtom(selectedImageIndexFinderAtom),
    updateDocIndex: useSetAtom(selectedDocIndexFinderAtom),
    selectedDocIndex: useAtomValue(selectedDocIndexAtom),
    setSelectedDocIndex: useSetAtom(selectedDocIndexAtom),
  };
};
