import { useAtomValue, useSetAtom } from "jotai";

import { MessageStore } from "@/features/chat/types";
import { focusAtom } from "jotai-optics";
import { atom } from "jotai";
import { ChatInfo } from "@/features/chat/types";

export const chatInfoAtom = atom<ChatInfo>({
  chatId: "",
  chatUserId: "",
});

const chatIdAtom = focusAtom(chatInfoAtom, (optic) => optic.prop("chatId"));
const chatUserIdAtom = focusAtom(chatInfoAtom, (optic) =>
  optic.prop("chatUserId"),
);

const chatSearchModeAtom = atom<boolean>(false);

export const messagesAtom = atom<MessageStore[]>([]);

export const imagesAtom = atom((get) =>
  get(messagesAtom).flatMap((msg) => msg?.images ?? []),
);

const docsAtom = atom((get) =>
  get(messagesAtom).flatMap((msg) => msg?.docs ?? []),
);

const focusedImageAtom = atom<any>(undefined);

const selectedImageIndexAtom = atom<number | null>(null);

const updateSelectedImageIndexAtom = atom(null, (get, set, url: string) => {
  if (get(selectedImageIndexAtom) !== null) {
    return;
  }

  const index = get(imagesAtom).findIndex((image) => image.url === url);

  set(selectedImageIndexAtom, index);
});

const selectedDocIndexAtom = atom<number | null>(null);

const updateSelectedDocIndexAtom = atom(null, (get, set, url: string) => {
  if (get(selectedDocIndexAtom) !== null) {
    return;
  }

  const index = get(docsAtom).findIndex((doc) => doc.url === url);

  set(selectedDocIndexAtom, index);
});

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
    chatId: useAtomValue(chatIdAtom),
    setChatId: useSetAtom(chatIdAtom),
    chatUserId: useAtomValue(chatUserIdAtom),
    setChatUserId: useSetAtom(chatUserIdAtom),
  };
};
