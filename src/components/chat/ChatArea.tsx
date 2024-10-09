import { getChatUserAction } from "@/actions/chat";
import ImagePreviewsWindowWrapper from "@/components/chat-window/ImagePreviewsWindowWrapper";
import CentrifugeConnection from "@/components/chat/CentrifugeConnection";
import ChatHistory from "@/components/chat/ChatHistory";
import ChatPanel from "@/components/chat/ChatPanel";
import HydrateAtoms from "@/components/chat/HydrateAtoms";
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
