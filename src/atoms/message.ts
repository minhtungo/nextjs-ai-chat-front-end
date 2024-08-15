import { NewMessage } from "@/types/chat";
import { atom } from "jotai";

const initialMessageState: NewMessage = {
  message: "",
  mathEquation: "",
  files: [],
  isPending: false,
};

export const messageAtom = atom<NewMessage>(initialMessageState);
