import { getCurrentUser } from "@/lib/auth";

import { getChatByIDUseCase } from "@/use-cases/chat";
import { notFound } from "next/navigation";
import { FC } from "react";
import Chat from "./components/Chat";

interface ChatPageProps {
  params: {
    id: string;
  };
}

const ChatPage: FC<ChatPageProps> = async ({ params: { id } }) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const chat = await getChatByIDUseCase(id, user.id!);

  if (!chat || chat.userId !== user.id) {
    notFound();
  }

  console.log(chat.messages);

  return <Chat user={user} chat={chat} />;
};

export default ChatPage;
