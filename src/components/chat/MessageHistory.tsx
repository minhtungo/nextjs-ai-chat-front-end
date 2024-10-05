"use client";

import { MESSAGES_LIMIT } from "@/config/config";
import BotMessage from "@/components/chat/BotMessage";
import EmptyChatScreen from "@/components/chat/EmptyChatScreen";
import UserMessage from "@/components/chat/UserMessage";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Spinner from "@/components/common/Spinner";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useMessages } from "@/hooks/use-messages";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { Message } from "@/lib/definitions";
import { cn, isGuestUser } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ComponentProps, Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface MessageHistoryProps extends ComponentProps<"div"> {
  chatId?: string;
  userId: string;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  initialMessages: Message[];
}

const MessageHistory = ({
  chatId,
  userId,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  className,
  initialMessages,
  ...props
}: MessageHistoryProps) => {
  const { messages: atomMessages } = useMessages();

  const messages = atomMessages || initialMessages;

  const { messagesRef, scrollRef, visibilityRef } = useScrollAnchor();

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
  });

  const { id: currentChatId } = useParams<{ id: string }>();

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

  if (messages.length === 0)
    return (
      <EmptyChatScreen className="h-[calc(100vh-145px)]" userId={userId} />
    );

  return (
    <ScrollArea className="h-full w-full" ref={scrollRef}>
      <MaxWidthWrapper className="max-w-5xl">
        {isFetchingNextPage && (
          <div className="mb-4 text-center">
            <Spinner />
          </div>
        )}
        <div className="h-px w-full" ref={inViewRef} />
        <div
          className={cn("w-full space-y-4", className)}
          ref={messagesRef}
          {...props}
        >
          {messages.map((message) => (
            <Fragment key={`${message.id}-${message.timestamp}`}>
              {message?.userId ? (
                <UserMessage message={message} />
              ) : (
                <BotMessage content={message?.content} />
              )}
            </Fragment>
          ))}
        </div>
        <div className="h-px w-full" ref={visibilityRef} />
      </MaxWidthWrapper>
    </ScrollArea>
  );
};

export default MessageHistory;
