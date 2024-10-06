import { MessageStore } from "@/types/chat";
import { focusAtom } from "jotai-optics";
import { atom } from "jotai";

type ChatInfo = {
  chatId?: string;
  chatUserId: string;
};

export const chatInfoAtom = atom<ChatInfo>({
  chatId: "",
  chatUserId: "",
});

export const chatIdAtom = focusAtom(chatInfoAtom, (optic) =>
  optic.prop("chatId"),
);
export const chatUserIdAtom = focusAtom(chatInfoAtom, (optic) =>
  optic.prop("chatUserId"),
);

export const chatSearchModeAtom = atom<boolean>(false);

export const messagesAtom = atom<MessageStore[]>([]);

export const imagesAtom = atom((get) =>
  get(messagesAtom).flatMap((msg) => msg?.images ?? []),
);

export const docsAtom = atom((get) =>
  get(messagesAtom).flatMap((msg) => msg?.docs ?? []),
);

export const focusedImageAtom = atom<any>(undefined);

export const selectedImageIndexAtom = atom<number | null>(null);

export const updateSelectedImageIndexAtom = atom(
  null,
  (get, set, url: string) => {
    if (get(selectedImageIndexAtom) !== null) {
      return;
    }

    const index = get(imagesAtom).findIndex((image) => image.url === url);

    set(selectedImageIndexAtom, index);
  },
);

export const selectedDocIndexAtom = atom<number | null>(null);

export const updateSelectedDocIndexAtom = atom(
  null,
  (get, set, url: string) => {
    if (get(selectedDocIndexAtom) !== null) {
      return;
    }

    const index = get(docsAtom).findIndex((doc) => doc.url === url);

    set(selectedDocIndexAtom, index);
  },
);
