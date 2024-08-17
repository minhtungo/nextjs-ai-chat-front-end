import ChatSkeleton from "@/components/private/skeleton/ChatSkeleton";
import { Suspense } from "react";
import ChatListHistory from "./ChatListHistory";

const ChatList = () => {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <div className="px-4">
        <ChatListHistory />
      </div>
    </Suspense>
  );
};

export default ChatList;
