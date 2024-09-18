"use client";

import Spinner from "@/components/common/Spinner";

import MessageHistory from "@/components/private/chat/MessageHistory";
import { useInfiniteMessages } from "@/hooks/use-infinite-messages";
import { usePreviews } from "@/hooks/use-previews";
import { Message } from "@/lib/definitions";

export interface ChatHistoryProps extends React.ComponentProps<"div"> {
  chatId?: string;
  userId: string;
  className?: string;
  initialMessages?: Message[];
}

const ChatHistory = ({
  chatId,
  userId,
  className,
  initialMessages,
}: ChatHistoryProps) => {
  const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteMessages({
      chatId,
      userId,
      initialMessages,
    });

  const fetchedMessages = usePreviews({ pages: data?.pages, chatId });

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-5 sm:size-6" />
      </div>
    );

  return (
    <MessageHistory
      initialMessages={fetchedMessages}
      chatId={chatId}
      userId={userId}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      className={className}
    />
  );
};

export default ChatHistory;
