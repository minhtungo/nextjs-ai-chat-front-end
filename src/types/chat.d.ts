import { Message } from "@/lib/definitions";

type FileType = "image" | "document" | "pdf";

export type NewMessage = {
  message: string;
  mathEquation: string;
  files: AtomFile[];
  isPending: boolean;
};

export type AtomFile = {
  id: string;
  name: string;
  type: FileType;
  url?: string;
  preview?: string;
  thumbnail?: string;
  size: number;
  isUploading?: boolean;
  originalWidth?: number;
  originalHeight?: number;
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

export type MessageFile = {
  id: string;
  name: string;
  url?: string;
  preview?: string;
  type: "image" | "document" | "pdf";
  thumbnail?: string;
  isUploading?: boolean;
  size: number;
  originalWidth?: number;
  originalHeight?: number;
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
