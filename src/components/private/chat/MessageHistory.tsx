"use client";

import { cn } from "@/lib/utils";
import BotMessage from "@/components/private/chat/BotMessage";
import React, { FC } from "react";
import UserMessage from "./UserMessage";
import { MessageStore } from "@/types/chat";

interface MessageHistoryProps {
  className?: string;
  messages: MessageStore[];
}

const MessageHistory: FC<MessageHistoryProps> = ({ messages, className }) => {
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
