export type Message = {
  id: string;
  content: string;
  images: string[];
  files: string[];
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
