import { chatUrl, signInUrl } from "@/app-config";
import Chat from "@/components/private/chat/Chat";
import ChatArea from "@/components/private/chat/ChatArea";
import { getCurrentUser } from "@/lib/auth";
import { getMessagesUseCase } from "@/use-cases/chat";
import { redirect } from "next/navigation";
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

  const messages = await getMessagesUseCase({
    chatId: id,
    query: {},
  });

  return <ChatArea userId={user.id!} chatId={id} initialMessages={messages} />;
};

export default ChatPage;
