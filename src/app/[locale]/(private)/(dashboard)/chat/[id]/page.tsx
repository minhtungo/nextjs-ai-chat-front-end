import ChatArea from "@/features/chat/components/ChatArea";
import Spinner from "@/components/common/Spinner";
import { Suspense } from "react";

interface ChatPageProps {
  params: {
    id: string;
  };
}

const ChatPage = async ({ params: { id } }: ChatPageProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="size-5 sm:size-6" />
        </div>
      }
    >
      <ChatArea chatId={id} />
    </Suspense>
  );
};

export default ChatPage;
