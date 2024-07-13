export type Message = {
  id: string;
  content: string;
  image: string | null;
  role: string;
  userId: string;
  chatId: string;
};

export type Chat = {
  id?: string;
  title: string | null;
  subject: string | null;
  createdAt: Date;
  userId: string;
  messages: Message[];
};
