import { chatUrl, signInUrl } from "@/app-config";
import ChatArea from "@/components/private/chat/ChatArea";
import { getChatInfo } from "@/data/chat";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { FC } from "react";

interface ChatPageProps {
  params: {
    id: string;
  };
}

const ChatPage: FC<ChatPageProps> = async ({ params: { id } }) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${signInUrl}?redirect=${chatUrl}/${id}`);
  }

  const chat = await getChatInfo(id);

  if (!chat) {
    notFound();
  }

  return (
    <ChatArea userId={user.id!} chatId={id} initialMessages={chat.messages} />
  );
};

export default ChatPage;
