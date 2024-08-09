import { MessageStore } from "@/types/chat";
import { getMessageImagesUseCase } from "@/use-cases/chat";
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
const chatImageCacheAtom = atom<{ [url: string]: string }>({});

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
  const setChatImageCache = useSetAtom(chatImageCacheAtom);
  const chatImageCache = useAtomValue(chatImageCacheAtom);

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

  const cacheImage = async (url: string) => {
    if (!chatImageCache[url]) {
      const dataUrl = await getMessageImagesUseCase({ url }); // Your existing function to fetch image
      setChatImageCache((prev) => ({ ...prev, [url]: dataUrl?.imageSrc! }));
      return dataUrl?.imageSrc!;
    }
    return chatImageCache[url];
  };

  return {
    store: useAtom(chatAtom),
    getChat: useAtomValue(chatAtom),
    setChat: useSetAtom(chatAtom),
    chatDocsArray: useAtomValue(chatDocsArrayAtom),
    chatImagesArray: useAtomValue(chatImagesArrayAtom),
    updateChatOverlay,
    cacheImage,
    chatImageCache,
  };
};

export { chatStore };
