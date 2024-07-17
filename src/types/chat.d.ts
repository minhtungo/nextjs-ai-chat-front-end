import { IFile } from "@/store/message";

export type Message = {
  id: string;
  content: string;
  files: IFile[];
  role: string;
  userId: string;
  chatId: string;
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
