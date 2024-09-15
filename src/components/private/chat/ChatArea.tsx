import DocPreviewWindowWrapper from "@/components/private/chat-window/DocPreviewWindowWrapper";
import ImagePreviewsWindowWrapper from "@/components/private/chat-window/ImagePreviewsWindowWrapper";
import ChatHistory from "@/components/private/chat/ChatHistory";
import ChatPanel from "@/components/private/chat/ChatPanel";
import ChatHeader from "@/components/private/common/ChatHeader";
import { getChatInfo } from "@/data/chat";
import { getChatUserUseCase } from "@/use-cases/session";
import { notFound } from "next/navigation";

interface ChatAreaProps {
  chatId?: string;
}

const ChatArea = async ({ chatId }: ChatAreaProps) => {
  const userPromise = getChatUserUseCase();
  const chatPromise = getChatInfo(chatId);

  const [user, chat] = await Promise.all([userPromise, chatPromise]);

  if (chatId && !chat) {
    notFound();
  }

  return (
    <>
      <ChatHeader user={user!} title={chat?.title} />
      <div className="relative flex h-full w-full flex-col overflow-hidden">
        <ChatHistory
          chatId={chatId}
          userId={user?.id!}
          initialMessages={chat?.messages}
        />
        <ChatPanel chatId={chatId} userId={user?.id!} />
        <ImagePreviewsWindowWrapper chatId={chatId} userId={user?.id!} />
        <DocPreviewWindowWrapper userId={user?.id!} chatId={chatId} />
      </div>
    </>
  );
};

export default ChatArea;
