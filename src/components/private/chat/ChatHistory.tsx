"use client";

import { ElementRef, FC, useEffect, useRef } from "react";

import Spinner from "@/components/common/Spinner";

import { MESSAGES_LIMIT } from "@/app-config";
import EmptyChatScreen from "@/components/private/chat/EmptyChatScreen";
import MessageHistory from "@/components/private/chat/MessageHistory";
import ScrollAreaContainer from "@/components/private/common/ScrollAreaContainer";
import { useInfiniteMessages } from "@/data/queries/use-infinite-messages";
import { useMessages } from "@/hooks/use-messages";
import { usePreviews } from "@/hooks/use-previews";
import { Message } from "@/lib/definitions";
import { cn, isGuestUser, isNotUndefinedOrEmptyArray } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

export interface ChatHistoryProps extends React.ComponentProps<"div"> {
  chatId?: string;
  userId: string;
  className?: string;
  messageClassName?: string;
  initialMessages?: Message[];
}

const ChatHistory: FC<ChatHistoryProps> = ({
  chatId,
  userId,
  className,
  messageClassName,
  initialMessages,
}) => {
  const { data, isFetchingNextPage, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteMessages({
      chatId,
      userId,
      initialMessages,
    });

  const fetchedMessages = usePreviews({ pages: data?.pages });

  const { messages, setMessages } = useMessages();

  const { id } = useParams<{ id: string }>();

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
  });

  const { ref: bottomRef, inView: isBottom } = useInView();

  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    if (!isGuestUser(userId)) {
      if (chatId && !id && messages.length === 1) {
        window.history.replaceState({}, "", `/chat/${chatId}`);
      }
    }
  }, [id, messages, userId]);

  useEffect(() => {
    if (fetchedMessages.length > 0) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  useEffect(() => {
    console.log("useEffect chatId");
    if (!chatId) {
      setMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    if (inView && hasNextPage && fetchedMessages.length >= MESSAGES_LIMIT) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    if (!isBottom && scrollRef.current && !inView) {
      scrollRef?.current?.scrollIntoView({ block: "end" });
    }
  }, [isBottom, fetchedMessages]);

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-5 sm:size-6" />
      </div>
    );

  return (
    <>
      {isNotUndefinedOrEmptyArray(messages) ? (
        <ScrollAreaContainer
          className={cn("flex h-full w-full flex-col", className)}
        >
          {isFetchingNextPage && <Spinner className="mx-auto mb-6" />}
          <div ref={inViewRef} />
          <MessageHistory className={messageClassName} />
          <div ref={bottomRef} />
          <div ref={scrollRef} />
        </ScrollAreaContainer>
      ) : (
        <EmptyChatScreen className="h-full" userId={userId} />
      )}
    </>
  );
};

export default ChatHistory;
