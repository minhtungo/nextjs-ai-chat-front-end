import { getChat } from "@/actions/chat";
import Chat from "@/components/chat/Chat";
import { getCurrentUser } from "@/lib/auth";
import { AI } from "@/lib/chat/actions";
import { Message } from "@/types/chat";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export interface ChatPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: ChatPageProps): Promise<Metadata> {
  const user = await getCurrentUser();

  if (!user) {
    return {};
  }

  const chat = await getChat(params.id, user?.id!);
  return {
    title: chat?.title.toString().slice(0, 50) ?? "Chat",
  };
}

const ChatPage = async ({ params }: ChatPageProps) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?redirect=/chat/${params.id}`);
  }

  const chat = await getChat(params.id, user.id!);

  if (!chat) {
    redirect("/");
  }

  if (chat?.userId !== user?.id) {
    notFound();
  }

  return (
    <AI
      initialAIState={{ chatId: chat.id, messages: chat.messages as Message[] }}
    >
      <Chat id={chat.id} user={user} />
    </AI>
  );
};

export default ChatPage;
