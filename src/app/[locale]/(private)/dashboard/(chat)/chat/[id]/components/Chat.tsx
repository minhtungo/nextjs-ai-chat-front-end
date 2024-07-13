"use client";

import { ElementRef, FC, useEffect, useRef } from "react";

import Container from "@/components/dashboard/Container";
import { User } from "next-auth";
import ChatPanel from "./ChatPanel";
import ChatList from "./ChatList";
import { Chat as ChatType } from "@/types/chat";
import { chatStore } from "@/store/chat";

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
      <Container className="max-w-5xl">
        <div className="flex h-full w-full flex-1 flex-col gap-y-5">
          {messages && messages.length > 0 && <ChatList messages={messages} />}
        </div>
      </Container>
      <div ref={scrollRef} />
      <ChatPanel user={user} />
    </>
  );
};

export default Chat;
