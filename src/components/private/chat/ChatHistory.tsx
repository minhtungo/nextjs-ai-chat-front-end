"use client";

import { ElementRef, FC, useEffect, useRef } from "react";

import Spinner from "@/components/common/Spinner";
import ChatOverlayView from "@/components/private/chat/ChatOverlayView";
import EmptyChat from "@/components/private/chat/EmptyChat";
import useInfiniteMessages from "@/hooks/data/use-infinite-messages";
import { chatStore } from "@/store/chat";
import { Chat as ChatRoom } from "@/types/chat";
import { User } from "next-auth";
import { useInView } from "react-intersection-observer";
import ScrollAreaContainer from "../common/ScrollAreaContainer";
import MessageHistory from "./MessageHistory";
import { ArrowUpIcon } from "lucide-react";

export interface ChatHistoryProps extends React.ComponentProps<"div"> {
  chat: ChatRoom;
  user: User;
}

const ChatHistory: FC<ChatHistoryProps> = ({ chat, user }) => {
  const {
    getChat: {
      overlay: { isOpen: isOverlayOpen },
    },
  } = chatStore();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
  });
  const { ref: bottomRef, inView: isBottom } = useInView();
  const scrollRef = useRef<ElementRef<"div">>(null);

  const { isLoading, messages, isFetchingNextPage } = useInfiniteMessages({
    chat,
    inView,
  });

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
      {messages && messages.length > 0 ? (
        <ScrollAreaContainer className="flex h-full w-full flex-col">
          {isFetchingNextPage && <Spinner className="mx-auto mb-6" />}
          <div ref={inViewRef} />
          <MessageHistory />
          <div ref={bottomRef} />
          <div ref={scrollRef} />
        </ScrollAreaContainer>
      ) : (
        <EmptyChat className="h-full" userId={user.id!} />
      )}
      {isOverlayOpen && <ChatOverlayView user={user} />}
    </>
  );
};

export default ChatHistory;
