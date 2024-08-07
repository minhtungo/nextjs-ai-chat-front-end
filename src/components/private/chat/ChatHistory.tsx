"use client";

import { ElementRef, FC, useRef } from "react";

import Spinner from "@/components/common/Spinner";
import EmptyChat from "@/components/private/chat/EmptyChat";
import useInfiniteMessages from "@/hooks/data/use-infinite-messages";
import { Chat as ChatRoom } from "@/types/chat";
import { useInView } from "react-intersection-observer";
import ScrollAreaContainer from "../common/ScrollAreaContainer";
import MessageHistory from "./MessageHistory";

export interface ChatHistoryProps extends React.ComponentProps<"div"> {
  chat: ChatRoom;
}

const ChatHistory: FC<ChatHistoryProps> = ({ chat }) => {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const { ref: inViewRef, inView } = useInView();

  const { isLoading, messages, isFetchingNextPage } = useInfiniteMessages({
    chat,
    inView,
  });

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
  //   }
  // }, [scrollRef.current]);

  if (isLoading) return <div className="h-full">Loading...</div>;

  return (
    <>
      {messages && messages.length > 0 ? (
        <ScrollAreaContainer className="flex h-full w-full flex-col">
          {isFetchingNextPage && <Spinner className="mx-auto mb-6" />}
          <div ref={inViewRef} />
          <MessageHistory />
          <div ref={scrollRef} />
        </ScrollAreaContainer>
      ) : (
        <EmptyChat className="h-full" />
      )}
    </>
  );
};

export default ChatHistory;
