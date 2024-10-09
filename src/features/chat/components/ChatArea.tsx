import { getChatUserAction } from "@/features/chat/actions";
import ImagePreviewsWindowWrapper from "@/features/chat/components/chat-window/ImagePreviewsWindowWrapper";
import CentrifugeConnection from "@/features/chat/components/CentrifugeConnection";
import ChatHistory from "@/features/chat/components/ChatHistory";
import ChatPanel from "@/features/chat/components/ChatPanel";
import HydrateAtoms from "@/features/chat/components/HydrateAtoms";
import ChatHeader from "@/components/layout/ChatHeader";
import { getChatInfoUseCase, getChatUserUseCase } from "@/use-cases/chat";
import { notFound } from "next/navigation";

interface ChatAreaProps {
  chatId?: string;
}

const ChatArea = async ({ chatId }: ChatAreaProps) => {
  const userPromise = getChatUserUseCase();
  const chatPromise = getChatInfoUseCase(chatId);

  const [{ user, token }, chat] = await Promise.all([userPromise, chatPromise]);

  if (chatId && !chat) {
    notFound();
  }

  return (
    <>
      <HydrateAtoms id={chatId!} userId={user?.id!} />
      <CentrifugeConnection token={token} userId={user?.id!} chatId={chatId} />
      <ChatHeader user={user} title={chat?.title} />
      <div className="relative flex h-full w-full flex-col overflow-hidden">
        <ChatHistory initialMessages={chat?.messages} />
        <ChatPanel />
        <ImagePreviewsWindowWrapper />
        {/* <DocPreviewWindowWrapper /> */}
      </div>
    </>
  );
};

export default ChatArea;
