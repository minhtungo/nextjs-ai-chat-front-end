"use client";

import MessageHistory from "@/features/chat/components/MessageHistory";
import Spinner from "@/components/common/Spinner";

import { useInfiniteMessages } from "@/hooks/use-infinite-messages";
import { usePreviews } from "@/hooks/use-previews";
import { Message } from "@/features/account/schemas";

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
