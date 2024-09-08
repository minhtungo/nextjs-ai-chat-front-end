import {
  docsAtom,
  guestIdAtom,
  imagesAtom,
  selectedDocPreview,
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
    selectedDocPreview: useAtomValue(selectedDocPreview),
    setSelectedDocPreview: useSetAtom(selectedDocPreview),
  };
};
