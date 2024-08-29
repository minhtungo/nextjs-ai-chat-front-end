import { chatUrl, signInUrl } from "@/app-config";
import Chat from "@/components/private/chat/Chat";
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

  const chat = await getMessagesUseCase({
    chatId: id,
    query: {},
  });

  if (!chat) {
    redirect(`/`);
  }

  return (
    <Chat
      user={user}
      userId={user.id!}
      chatId={id}
      initialMessages={chat.messages}
    />
  );
};

export default ChatPage;
