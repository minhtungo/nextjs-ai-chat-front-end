import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ChatSkeletonProps {
  length?: number;
}

const ChatSkeleton: FC<ChatSkeletonProps> = ({ length = 5 }) => {
  return (
    <div className="space-y-1.5 px-4">
      {Array.from({ length }).map((_, i) => (
        <Skeleton key={`${i}-chat-skeleton`} className="h-9 w-full shrink-0" />
      ))}
    </div>
  );
};

export default ChatSkeleton;
