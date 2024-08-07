import Chat from "@/components/private/chat/Chat";
import { getCurrentUser } from "@/lib/auth";

import { getMessagesUseCase } from "@/use-cases/chat";
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

  const { messages } = await getMessagesUseCase({
    roomId: id,
    userId: user.id!,
    query: {},
  });

  const chat = {
    id,
    messages,
    userId: user.id!,
    title: "New Chat",
    subject: "Mathematics",
  };

  return <Chat user={user} chat={chat} />;
};

export default ChatPage;
