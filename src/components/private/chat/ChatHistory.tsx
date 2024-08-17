"use client";

import { ElementRef, FC, useEffect, useRef } from "react";

import Spinner from "@/components/common/Spinner";
import EmptyChat from "@/components/private/chat/EmptyChat";

import { useInfiniteMessages } from "@/data/queries/use-infinite-messages";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import ScrollAreaContainer from "../common/ScrollAreaContainer";
import MessageHistory from "./MessageHistory";
import { MESSAGES_LIMIT } from "@/lib/constant";

export interface ChatHistoryProps extends React.ComponentProps<"div"> {
  chatId: string;
  userId: string;
  className?: string;
  messageClassName?: string;
}

const ChatHistory: FC<ChatHistoryProps> = ({
  chatId,
  userId,
  className,
  messageClassName,
}) => {
  console.log("chat history==================");

  const {
    isFetchingNextPage,
    messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteMessages(chatId);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
  });
  const scrollRef = useRef<ElementRef<"div">>(null);
  const { ref: bottomRef, inView: isBottom } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && messages.length >= MESSAGES_LIMIT) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    if (!isBottom && scrollRef.current && !inView) {
      scrollRef?.current?.scrollIntoView({ block: "end" });
    }
  }, [isBottom, messages]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner className="size-5" />
      </div>
    );
  }

  return (
    <>
      {messages.length > 0 ? (
        <>
          <ScrollAreaContainer
            className={cn("flex h-full w-full flex-col", className)}
          >
            {isFetchingNextPage && <Spinner className="mx-auto mb-6" />}
            <div ref={inViewRef} />
            <MessageHistory messages={messages} className={messageClassName} />
            <div ref={bottomRef} />
            <div ref={scrollRef} />
          </ScrollAreaContainer>
        </>
      ) : (
        <EmptyChat className="h-full" userId={userId} chatId={chatId} />
      )}
    </>
  );
};

export default ChatHistory;
