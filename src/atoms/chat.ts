import { MessageStore } from "@/types/chat";
import { atom } from "jotai";

// type FileAtom = {
//   name: string;
//   type: string;
//   url?: string;
//   originalHeight?: number;
//   originalWidth?: number;
//   thumbnail?: string;
// };

// type ChatAtom = {
//   id: string | null;
//   selectedImageIndex: number | null;
//   messages: MessageStore[];
// };

// export const chatInitialState: ChatAtom = {
//   id: "",
//   selectedImageIndex: null,
//   messages: [],
// };

// export const chatAtom = atom<ChatAtom>(chatInitialState);

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
  console.log("inside", url);
  const index = get(imagesAtom).findIndex((image) => image.url === url);
  console.log("index", index);

  set(selectedImageIndexAtom, index);
});
