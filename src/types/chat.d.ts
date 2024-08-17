import { Message } from "@/lib/definitions";

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
  title: string;
  subject: string;
  timestamp: number;
  last_active: number;
};

export type MessageResponse = {
  message: {
    content: string;
    docs?: IFile[];
    images?: IFile[];
  };
  timestamp: number;
  userid: string;
};

export type MessageStore = Omit<Message, "docs" | "images"> & {
  id: string;
  docs?: IFile[];
  images?: IFile[];
};

export type NewMessage = Omit<Message, "id" | "chatId">;

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
