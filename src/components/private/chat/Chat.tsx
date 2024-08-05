"use client";

import { ElementRef, FC, useEffect, useMemo, useRef } from "react";

import { loadMessagesAction } from "@/actions/chat";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import ChatWelcome from "@/components/private/chat/ChatWelcome";
import PromptSuggestions from "@/components/private/chat/PromptSuggestions";
import { useServerActionInfiniteQuery } from "@/hooks/server-action-hooks";
import { chatStore } from "@/store/chat";
import { File, Chat as TChat, Message as TMessage } from "@prisma/client";
import { User } from "next-auth";
import { useInView } from "react-intersection-observer";
import ScrollAreaContainer from "../common/ScrollAreaContainer";
import ChatOverlayView from "./ChatOverlayView";
import ChatPanel from "./ChatPanel";
import MessageHistory from "./MessageHistory";

export interface ChatProps extends React.ComponentProps<"div"> {
  user: User;
  chat: TChat & {
    messages: TMessage[] & {
      files: File[];
    };
  };
}

const Chat: FC<ChatProps> = ({ user, chat }) => {
  const {
    store: [
      {
        overlay: { isOpen: isOverlayOpen },
      },
      setChat,
    ],
  } = chatStore();

  const scrollRef = useRef<ElementRef<"div">>(null);
  const { ref, inView } = useInView();

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useServerActionInfiniteQuery(loadMessagesAction, {
      initialPageParam: 0,
      queryKey: ["loadMessages", chat.id],
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.messages[lastPage.messages.length - 1]?.timestamp !== 0
          ? lastPage.messages[lastPage.messages.length - 1]?.timestamp
          : undefined;
      },
      input: ({ pageParam }) => ({
        roomId: chat.id,
        query: {
          limit: 15,
          ...(pageParam !== 0 && { offset: pageParam }),
        },
      }),
    });

  const messageData = useMemo(
    () => (data ? data?.pages.flatMap((item) => item.messages) : []),
    [data],
  );

  console.log("flatMessages", messageData);

  // useEffect(() => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
  //   }
  // }, [scrollRef.current]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    console.log("inView", inView, hasNextPage);
  }, [inView, hasNextPage]);

  useEffect(() => {
    if (isLoading) return;

    setChat((prev) => ({
      ...prev,
      id: chat.id,
      subject: chat.subject,
      ...(chat.title && { title: chat.title }),
      messages: messageData.toReversed(),
    }));
  }, [isLoading, messageData]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {messageData && messageData.length > 0 ? (
        <ScrollAreaContainer className="flex h-full w-full flex-col pt-4">
          <div ref={ref} />
          <MessageHistory />
          <div ref={scrollRef} />
        </ScrollAreaContainer>
      ) : (
        <ChatWelcome className="h-full w-full flex-1" />
      )}
      <MaxWidthWrapper className="space-y-3 py-3">
        {messageData && messageData.length > 4 && (
          <PromptSuggestions className="mt-4" />
        )}

        <ChatPanel user={user} chatId={chat.id} />
      </MaxWidthWrapper>
      {isOverlayOpen && <ChatOverlayView user={user} />}
    </>
  );
};

export default Chat;
