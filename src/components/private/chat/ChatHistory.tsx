import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import ChatListHistory from "./ChatListHistory";

const ChatHistory = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 flex-col space-y-1.5 overflow-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={`${i}-chat-skeleton`}
              className="h-10 w-full shrink-0"
            />
          ))}
        </div>
      }
    >
      <ChatListHistory />
    </Suspense>
  );
};

export default ChatHistory;
