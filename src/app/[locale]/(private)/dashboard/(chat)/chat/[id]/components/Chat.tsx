"use client";

import { ElementRef, FC, useEffect, useRef } from "react";

import { User } from "next-auth";
import ChatPanel from "./ChatPanel";
import MessageHistory from "./MessageHistory";
import { Chat as ChatType } from "@/types/chat";
import { chatStore } from "@/store/chat";
import Container from "../../../../components/Container";
import ChatOverlayView from "./ChatOverlayView";

export interface ChatProps extends React.ComponentProps<"div"> {
  user: User;
  chat: ChatType;
}

const Chat: FC<ChatProps> = ({ user, chat }) => {
  const {
    store: [{ messages }, setChat],
  } = chatStore();

  useEffect(() => {
    setChat((prev) => ({
      ...prev,
      id: chat.id!,
      subject: chat.subject,
      messages: chat.messages,
    }));
  }, [chat]);

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
      <ChatPanel user={user} />
      <ChatOverlayView user={user} />
    </>
  );
};

export default Chat;
