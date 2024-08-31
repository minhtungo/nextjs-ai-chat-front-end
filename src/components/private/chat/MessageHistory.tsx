"use client";

import BotMessage from "@/components/private/chat/BotMessage";
import { useMessages } from "@/hooks/use-messages";
import { cn } from "@/lib/utils";
import React, { FC } from "react";
import UserMessage from "./UserMessage";

interface MessageHistoryProps {
  className?: string;
}

const MessageHistory: FC<MessageHistoryProps> = ({ className }) => {
  const { messages } = useMessages();
  console.log("MessageHistory", messages);

  return (
    <div className={cn("w-full space-y-4", className)}>
      {messages.map((message) => (
        <React.Fragment key={`${message.id}-${message.timestamp}`}>
          {message?.userId ? (
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
