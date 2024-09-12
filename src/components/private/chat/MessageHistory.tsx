"use client";

import BotMessage from "@/components/private/chat/BotMessage";
import UserMessage from "@/components/private/chat/UserMessage";
import { Message } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import React from "react";

type MessageHistoryProps = React.HTMLAttributes<HTMLDivElement> & {
  messages: Message[];
};

const MessageHistory = React.forwardRef<HTMLDivElement, MessageHistoryProps>(
  ({ className, messages, children, ...props }, ref) => {
    return (
      <div className={cn("w-full space-y-4", className)} ref={ref} {...props}>
        {messages.map((message) => (
          <React.Fragment key={`${message.id}-${message.timestamp}`}>
            {message?.userId ? (
              <UserMessage message={message} />
            ) : (
              <BotMessage content={message?.content} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  },
);

export default MessageHistory;
