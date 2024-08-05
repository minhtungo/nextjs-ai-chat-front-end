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

  console.log("messages", messages);

  return (
    <div className={cn("w-full space-y-4", className)}>
      {messages.map((message, index) => (
        <React.Fragment key={index + message.content.substring(0, 10)}>
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
