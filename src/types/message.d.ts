export type MessageAtom = {
  id: string;
  content: string;
  role: "user" | "bot";
  userId: string;
  docs?: FileAtom[];
  images?: FileAtom[];
  timestamp: number;
};
