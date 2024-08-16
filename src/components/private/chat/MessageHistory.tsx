"use client";

import BotMessage from "@/components/private/chat/BotMessage";
import { Message } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import React, { FC, memo } from "react";
import UserMessage from "./UserMessage";

interface MessageHistoryProps {
  className?: string;
  messages: Message[];
}

const MessageHistory: FC<MessageHistoryProps> = memo(
  ({ className, messages }) => {
    return (
      <div className={cn("w-full space-y-4", className)}>
        {messages.map((message) => (
          <React.Fragment key={`${message.id}-${message.timestamp}`}>
            {message.userId ? (
              <UserMessage message={message} />
            ) : (
              <BotMessage content={message.content} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  },
);

export default MessageHistory;
