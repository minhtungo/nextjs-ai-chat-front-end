"use client";

import { ElementRef, FC, useEffect, useRef } from "react";

import { chatStore } from "@/store/chat";
import { File, Chat as TChat, Message as TMessage } from "@prisma/client";
import { User } from "next-auth";
import Container from "../common/Container";
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
    store: [{ messages }, setChat],
  } = chatStore();

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
