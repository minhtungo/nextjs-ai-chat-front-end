import { MessageStore } from "@/types/chat";
import { atom } from "jotai";

export const guestIdAtom = atom<string>("");

export const messagesAtom = atom<MessageStore[]>([]);

export const imagesAtom = atom((get) =>
  get(messagesAtom).flatMap((msg) => msg?.images ?? []),
);

export const docsAtom = atom((get) =>
  get(messagesAtom).flatMap((msg) => msg?.docs ?? []),
);

export const selectedImageIndexAtom = atom<number | null>(null);

export const selectedImageIndexFinderAtom = atom(null, (get, set, url) => {
  if (get(selectedImageIndexAtom) !== null) {
    return;
  }

  const index = get(imagesAtom).findIndex((image) => image.url === url);

  set(selectedImageIndexAtom, index);
});
