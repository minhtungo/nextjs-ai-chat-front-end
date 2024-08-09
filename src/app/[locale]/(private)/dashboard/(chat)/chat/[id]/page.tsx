import Chat from "@/components/private/chat/Chat";
import { getCurrentUser } from "@/lib/auth";

import { getChatUseCase, getMessagesUseCase } from "@/use-cases/chat";
import { getTokenUseCase } from "@/use-cases/user";
import { notFound } from "next/navigation";
import { FC } from "react";

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

  const chat = await getChatUseCase({
    chatId: id,
  });

  return <Chat user={user} chat={chat} />;
};

export default ChatPage;
