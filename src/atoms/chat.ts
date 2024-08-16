import { MessageStore } from "@/types/chat";
import { atom } from "jotai";

export const messagesAtom = atom<MessageStore[]>([]);

export const imagesAtom = atom((get) =>
  get(messagesAtom).flatMap((msg) => msg.images ?? []),
);

export const docsAtom = atom((get) =>
  get(messagesAtom).flatMap((msg) => msg.docs ?? []),
);

export const selectedImageIndexAtom = atom<number | null>(null);

export const selectedImageIndexFinderAtom = atom(null, (get, set, url) => {
  console.log("inside", url);
  if (get(selectedImageIndexAtom) !== null) {
    return;
  }
  console.log("below", url);

  console.log("all images", get(imagesAtom));

  const index = get(imagesAtom).findIndex((image) => image.url === url);
  console.log("index", index);

  set(selectedImageIndexAtom, index);
});
