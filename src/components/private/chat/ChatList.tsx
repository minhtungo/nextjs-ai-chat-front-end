import ChatSkeleton from "@/components/private/skeleton/ChatSkeleton";
import { Suspense } from "react";
import ChatListHistory from "./ChatListHistory";

const ChatList = () => {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatListHistory />
    </Suspense>
  );
};

export default ChatList;
