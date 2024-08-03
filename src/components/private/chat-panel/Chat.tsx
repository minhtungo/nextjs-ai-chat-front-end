"use client";

import { ElementRef, FC, useCallback, useEffect, useMemo, useRef } from "react";

import { chatStore } from "@/store/chat";
import { File, Chat as TChat, Message as TMessage } from "@prisma/client";
import { User } from "next-auth";
import Container from "../common/Container";
import ChatOverlayView from "./ChatOverlayView";
import ChatPanel from "./ChatPanel";
import MessageHistory from "./MessageHistory";
import { useServerActionInfiniteQuery } from "@/hooks/server-action-hooks";
import { loadMessagesAction } from "@/actions/chat";

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
    store: [{ messages }, setChat],
  } = chatStore();
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    setChat((prev) => ({
      ...prev,
      id: chat.id,
      subject: chat.subject,
      ...(chat.title && { title: chat.title }),
      messages: chat.messages.map(
        ({ id, content, files, role, userId, chatId }) => {
          return {
            id,
            content,
            files: files.map(({ name, type, url }) => {
              return {
                name,
                type,
                url,
              };
            }),
            role,
            userId,
            chatId,
          };
        },
      ),
    }));
  }, []);

  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { isLoading, data, fetchNextPage, hasNextPage, isFetching } =
    useServerActionInfiniteQuery(loadMessagesAction, {
      initialPageParam: 0,
      queryKey: ["loadMessages", chat.id],
      getNextPageParam: (lastPage, allPages) => {
        console.log("lastPage", lastPage);
        console.log("allPages", allPages);
        return lastPage.messages.data ? allPages.length + 1 : undefined;
      },
      input: ({ pageParam }) => ({
        roomId: chat.id,
        query: {
          limit: 10,
          offset: 1722650605.583214,
        },
      }),
    });

  const flatMessages = useMemo(
    () => (data ? data?.pages.flatMap((item) => item.messages) : []),
    [data],
  );
  console.log("-------------------data", flatMessages);
  console.log("messages", messages);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading],
  );

  return (
    <>
      <Container>
        <div className="h-full w-full flex-1">
          {messages && messages.length > 0 && (
            <MessageHistory messages={messages} />
          )}
        </div>
      </Container>
      <div ref={scrollRef} />
      <ChatPanel user={user} chatId={chat.id} />
      <ChatOverlayView user={user} />
    </>
  );
};

export default Chat;
