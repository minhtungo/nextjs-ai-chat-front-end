export type Message = {
  id: string;
  content: string;
  image: string | null;
  role: string;
  userId: string;
};

export type Chat = {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  messages: Message[];
};
