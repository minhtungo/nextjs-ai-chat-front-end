import { getCurrentUser } from "@/lib/auth";

import { FC } from "react";
import Chat from "./components/Chat";
import { getChatAction } from "@/actions/chat";
import { notFound } from "next/navigation";

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

  const [chat] = await getChatAction({
    chatID: id,
  });

  if (!chat || chat?.userId !== user?.id) {
    notFound();
  }

  return <Chat user={user} id={id} initialMessages={chat.messages} />;
};

export default ChatPage;
