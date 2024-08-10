import { MessageStore } from "@/types/chat";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

export type ChatConfig = {
  id: string | null;
  title?: string;
  subject: string | null;
  messages: MessageStore[];
  overlay: {
    isOpen: boolean;
    selectedImageIndex: number;
  };
  isEditingTitle?: boolean;
};

export const chatInitialState: ChatConfig = {
  id: "",
  subject: "",
  title: "",
  messages: [],
  overlay: {
    isOpen: false,
    selectedImageIndex: 0,
  },
  isEditingTitle: false,
};

const chatAtom = atom<ChatConfig>(chatInitialState);

const chatDocsArrayAtom = atom((get) => {
  const messages = get(chatAtom).messages;
  return messages.flatMap((message) => message?.docs);
});

const chatImagesArrayAtom = atom((get) => {
  const messages = get(chatAtom).messages;
  return messages.flatMap((message) => message.images);
});

const chatStore = () => {
  const setChat = useSetAtom(chatAtom);

  const updateChatOverlay = ({
    isOpen,
    selectedImageIndex = 0,
  }: {
    isOpen: boolean;
    selectedImageIndex: number;
  }) => {
    setChat((prev) => ({
      ...prev,
      overlay: {
        isOpen,
        selectedImageIndex,
      },
    }));
  };

  return {
    store: useAtom(chatAtom),
    getChat: useAtomValue(chatAtom),
    setChat: useSetAtom(chatAtom),
    chatDocsArray: useAtomValue(chatDocsArrayAtom),
    chatImagesArray: useAtomValue(chatImagesArrayAtom),
    updateChatOverlay,
  };
};

export { chatStore };
