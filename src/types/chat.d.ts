import { Message } from "@/lib/definitions";

type IFile = {
  name: string;
  type: "image" | "document" | "pdf";
  url?: string;
  preview?: string;
  isUploading?: boolean;
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
  id?: string;
  title: string | null;
  subject: string | null;
  createdAt: Date;
  userId: string;
  messages: Message[];
};
