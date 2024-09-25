import ChatArea from "@/components/chat/ChatArea";
import Spinner from "@/components/common/Spinner";
import { Suspense } from "react";

const ChatIndexPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Spinner className="size-5 sm:size-6" />
        </div>
      }
    >
      <ChatArea />
    </Suspense>
  );
};

export default ChatIndexPage;
