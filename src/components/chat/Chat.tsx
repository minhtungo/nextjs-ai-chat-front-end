"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { useAIState, useUIState } from "ai/rsc";
import { usePathname, useRouter } from "next/navigation";
import { ElementRef, FC, useEffect, useRef, useState } from "react";
import ButtonScrollToBottom from "../ButtonScrollToBottom";
import Container from "../dashboard/Container";
import ChatList from "./ChatList";
import ChatPanel from "./ChatPanel";
import { User } from "next-auth";
import { PROTECTED_BASE_URL } from "@/routes";

export interface ChatProps extends React.ComponentProps<"div"> {
  id?: string;
  user?: User;
}

const Chat: FC<ChatProps> = ({ id, user }) => {
  const path = usePathname();
  const [input, setInput] = useState("");
  const [messages] = useUIState();
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [_, setNewChatId] = useLocalStorage("newChatId", id);

  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (chatBoxRef.current) {
  //     chatBoxRef.current.scrollIntoView(false);
  //   }
  // }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (user) {
      if (!path.includes("chat") && messages.length === 1) {
        window.history.replaceState({}, "", `${PROTECTED_BASE_URL}/chat/${id}`);
      }
    }
  }, [id, path, user, messages]);

  // useEffect(() => {
  //   const messagesLength = aiState.messages?.length;
  //   if (messagesLength === 2) {
  //     router.refresh();
  //   }
  // }, [aiState.messages, router]);

  useEffect(() => {
    setNewChatId(id);
  }, [id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { messagesRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <>
      <Container className="max-w-5xl">
        <div
          className="flex h-full w-full flex-1 flex-col gap-y-5"
          ref={chatBoxRef}
        >
          {messages.length > 0 && <ChatList messages={messages} />}
        </div>
        <div className="h-px w-full" ref={visibilityRef} />
      </Container>
      <div ref={scrollRef}></div>
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <ChatPanel input={input} setInput={setInput} />
    </>
  );
};

export default Chat;
