import Chat from "@/components/private/chat/Chat";
import { getCurrentUser } from "@/lib/auth";

import { getMessagesUseCase } from "@/use-cases/chat";
import { getTokenUseCase } from "@/use-cases/user";
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

  const data = await getMessagesUseCase({
    roomId: id,
    query: {},
  });

  const chat = {
    id,
    messages: data.messages,
    userId: user.id!,
    title: "New Chat",
    subject: "Mathematics",
  };

  return <Chat user={user} chat={chat} />;
};

export default ChatPage;
