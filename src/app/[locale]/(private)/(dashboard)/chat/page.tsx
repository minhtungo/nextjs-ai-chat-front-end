import Spinner from "@/components/common/Spinner";
import { getTotalUsers } from "@/data/admin/user";
import ChatArea from "@/features/chat/components/ChatArea";
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
      <div>Test: {getTotalUsers()}</div>
      <ChatArea />
    </Suspense>
  );
};

export default ChatIndexPage;
