import Chat from "@/components/private/chat/Chat";
import { getCurrentUser } from "@/lib/auth";

import { getChatUseCase } from "@/use-cases/chat";
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
