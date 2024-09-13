"use client";

import BotMessage from "@/components/private/chat/BotMessage";
import UserMessage from "@/components/private/chat/UserMessage";
import { useMessages } from "@/hooks/use-messages";
import { cn } from "@/lib/utils";
import React from "react";

type MessageHistoryProps = React.HTMLAttributes<HTMLDivElement> & {};

const MessageHistory = React.forwardRef<HTMLDivElement, MessageHistoryProps>(
  ({ className, children, ...props }, ref) => {
    const { messages } = useMessages();

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
