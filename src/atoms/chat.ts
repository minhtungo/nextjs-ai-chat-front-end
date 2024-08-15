import { MessageStore } from "@/types/chat";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

type FileAtom = {
  name: string;
  type: string;
  url?: string;
  originalHeight?: number;
  originalWidth?: number;
  thumbnail?: string;
};

type ChatAtom = {
  id: string | null;
  selectedImageIndex: number | null;
  messages: MessageStore[];
  docs: FileAtom[];
  images: FileAtom[];
};

export const chatInitialState: ChatAtom = {
  id: "",
  selectedImageIndex: null,
  messages: [],
  docs: [],
  images: [],
};

export const chatAtom = atom<ChatAtom>(chatInitialState);

export const messagesAtom = focusAtom(chatAtom, (optic) =>
  optic.prop("messages"),
);

export const docsAtom = focusAtom(chatAtom, (optic) => optic.prop("docs"));

export const imagesAtom = focusAtom(chatAtom, (optic) => optic.prop("images"));

export const selectedImageIndexAtom = focusAtom(chatAtom, (optic) =>
  optic.prop("selectedImageIndex"),
);
