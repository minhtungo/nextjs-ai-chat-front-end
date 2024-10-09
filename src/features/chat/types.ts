import { Message } from "@/lib/definitions";
import { FileAtom } from "@/types/file";

export type ChatInfo = {
  chatId?: string;
  chatUserId: string;
};

export type NewMessage = {
  content: string;
  mathEquation: string;
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
