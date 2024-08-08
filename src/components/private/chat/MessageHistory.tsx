"use client";

import BotMessage from "@/components/private/chat/BotMessage";
import { cn } from "@/lib/utils";
import { chatStore } from "@/store/chat";
import React, { FC } from "react";
import UserMessage from "./UserMessage";

interface MessageHistoryProps {
  className?: string;
}

const MessageHistory: FC<MessageHistoryProps> = ({ className }) => {
  const {
    getChat: { messages },
  } = chatStore();

  return (
    <div className={cn("w-full space-y-4", className)}>
      {messages.map((message) => (
        <React.Fragment key={message.id}>
          {message.userId ? (
            <UserMessage message={message} />
          ) : (
            <BotMessage content={message.content} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MessageHistory;
