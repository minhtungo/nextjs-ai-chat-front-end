"use client";

import Spinner from "@/components/common/Spinner";
import MessageHistory from "@/features/chat/components/MessageHistory";

import { Message } from "@/features/chat/schemas";
import { useInfiniteMessages } from "@/features/chat/api/use-infinite-messages";
import { usePreviews } from "@/features/chat/api/use-previews";

export interface ChatHistoryProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
}

const ChatHistory = ({ className, initialMessages }: ChatHistoryProps) => {
  const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteMessages({
      initialMessages,
    });

  const fetchedMessages = usePreviews({ pages: data?.pages });

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-5 sm:size-6" />
      </div>
    );

  return (
    <MessageHistory
      initialMessages={fetchedMessages}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      className={className}
    />
  );
};

export default ChatHistory;
