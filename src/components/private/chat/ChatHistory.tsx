"use client";

import { FC, useEffect } from "react";

import Spinner from "@/components/common/Spinner";

import { MESSAGES_LIMIT } from "@/app-config";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import EmptyChatScreen from "@/components/private/chat/EmptyChatScreen";
import MessageHistory from "@/components/private/chat/MessageHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInfiniteMessages } from "@/hooks/use-infinite-messages";
import { usePreviews } from "@/hooks/use-previews";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { Message } from "@/lib/definitions";
import { isGuestUser, isNotUndefinedOrEmptyArray } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

export interface ChatHistoryProps extends React.ComponentProps<"div"> {
  chatId?: string;
  userId: string;
  className?: string;
  initialMessages?: Message[];
}

const ChatHistory: FC<ChatHistoryProps> = ({
  chatId,
  userId,
  className,
  initialMessages,
}) => {
  const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteMessages({
      chatId,
      userId,
      initialMessages,
    });

  const messages = usePreviews({ pages: data?.pages, chatId });

  const { id: currentChatId } = useParams<{ id: string }>();

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (!isGuestUser(userId)) {
      if (chatId && !currentChatId && messages.length === 1) {
        window.history.replaceState({}, "", `/chat/${chatId}`);
      }
    }
  }, [currentChatId, messages, userId]);

  useEffect(() => {
    if (inView && hasNextPage && messages.length >= MESSAGES_LIMIT) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const { messagesRef, scrollRef, visibilityRef } = useScrollAnchor();

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-5 sm:size-6" />
      </div>
    );

  return (
    <ScrollArea className="w-= h-full" ref={scrollRef}>
      {isNotUndefinedOrEmptyArray(messages) ? (
        <MaxWidthWrapper className="max-w-5xl">
          {isFetchingNextPage && (
            <div className="mb-4 text-center">
              <Spinner />
            </div>
          )}
          <div className="h-px w-full" ref={inViewRef} />
          <MessageHistory ref={messagesRef} className={className} />
          <div className="h-px w-full" ref={visibilityRef} />
        </MaxWidthWrapper>
      ) : (
        <EmptyChatScreen className="h-[calc(100vh-140px)]" userId={userId} />
      )}
    </ScrollArea>
  );
};

export default ChatHistory;
