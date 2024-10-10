import { Message } from "@/features/chat/schemas";

type FileType = "image" | "document" | "pdf";

export type FileAtom = {
  id?: string;
  name: string;
  type?: FileType;
  url?: string;
  preview?: string;
  size?: number;
  isUploading?: boolean;
  originalWidth?: number;
  originalHeight?: number;
};

export type CreateMessageAtom = {
  id: string;
  content: string;
  role: "user" | "bot";
  userId: string;
  docs?: FileAtom[];
  images?: FileAtom[];
  timestamp: number;
};

export type MessageAtom = {
  content: string;
  mathEquation: string;
};

export type ChatInfo = {
  chatId?: string;
  chatUserId: string;
};

export type CreateNewRoomResponse = {
  roomid: string;
  uid: string;
};

export type ChatRoom = {
  id: string;
  title: string;
  subject: string;
  messages: Message[];
};

export type ChatListItem = {
  id: string;
  userId: string;
  title: string;
  subject: string;
  timestamp: number;
  last_active: number;
};

export type MessageResponse = {
  message: {
    content: string;
    docs?: FileAtom[];
    images?: FileAtom[];
  };
  timestamp: number;
  userid: string;
};

export type MessageStore = Omit<Message, "docs" | "images"> & {
  id: string;
  docs?: FileAtom[];
  images?: FileAtom[];
};

export type Chat = {
  id: string;
  title: string;
  subject: string;
  userId: string;
  messages: Message[];
};

export type InfiniteMessagePage = {
  pageParams: number[];
  pages: {
    messages: Message[];
  };
};
