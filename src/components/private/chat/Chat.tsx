"use client";

import { ElementRef, FC, useEffect, useRef } from "react";

import { chatStore } from "@/store/chat";
import { File, Chat as TChat, Message as TMessage } from "@prisma/client";
import { User } from "next-auth";
import ScrollAreaContainer from "../common/ScrollAreaContainer";
import ChatOverlayView from "./ChatOverlayView";
import ChatPanel from "./ChatPanel";
import MessageHistory from "./MessageHistory";
import PromptSuggestions from "@/components/private/chat/PromptSuggestions";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import ChatWelcome from "@/components/private/chat/ChatWelcome";

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
        messages,
        overlay: { isOpen: isOverlayOpen },
      },
      setChat,
    ],
  } = chatStore();

  const scrollRef = useRef<ElementRef<"div">>(null);

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
            files: files.map(
              ({
                name,
                type,
                url,
              }: {
                name: string;
                type: string;
                url: string;
              }) => {
                return {
                  name,
                  type,
                  url,
                };
              },
            ),
            role,
            userId,
            chatId,
          };
        },
      ),
    }));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [messages, scrollRef.current]);

  return (
    <>
      {messages && messages.length > 0 ? (
        <>
          <ScrollAreaContainer className="flex h-full w-full flex-col pt-4">
            <MessageHistory messages={messages} />
            <div ref={scrollRef} />
          </ScrollAreaContainer>
        </>
      ) : (
        <ChatWelcome className="h-full w-full flex-1" />
      )}
      <MaxWidthWrapper className="space-y-3 py-3">
        {messages && messages.length > 4 && (
          <PromptSuggestions className="mt-4" />
        )}

        <ChatPanel user={user} chatId={chat.id} />
      </MaxWidthWrapper>
      {isOverlayOpen && <ChatOverlayView user={user} />}
    </>
  );
};

export default Chat;

// const observer = useRef<IntersectionObserver>();
// const { isLoading, data, fetchNextPage, hasNextPage, isFetching } =
//   useServerActionInfiniteQuery(loadMessagesAction, {
//     initialPageParam: 0,
//     queryKey: ["loadMessages", chat.id],
//     getNextPageParam: (lastPage, allPages) => {
//       console.log("lastPage", lastPage);
//       console.log("allPages", allPages);
//       return lastPage.messages.data ? allPages.length + 1 : undefined;
//     },
//     input: ({ pageParam }) => ({
//       roomId: chat.id,
//       query: {
//         limit: 10,
//         offset: 1722650605.583214,
//       },
//     }),
//   });

// const flatMessages = useMemo(
//   () => (data ? data?.pages.flatMap((item) => item.messages) : []),
//   [data],
// );

// const lastElementRef = useCallback(
//   (node: HTMLDivElement) => {
//     if (isLoading) return;

//     if (observer.current) observer.current.disconnect();

//     observer.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting && hasNextPage && !isFetching) {
//         fetchNextPage();
//       }
//     });

//     if (node) observer.current.observe(node);
//   },
//   [fetchNextPage, hasNextPage, isFetching, isLoading],
// );
