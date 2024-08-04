import { Message } from "@/types/chat";
import { FC } from "react";
import UserMessage from "./UserMessage";
import { cn } from "@/lib/utils";
import BotMessage from "@/components/private/chat/BotMessage";

interface MessageHistoryProps {
  messages: Message[];
  className?: string;
}

const MessageHistory: FC<MessageHistoryProps> = ({ messages, className }) => {
  return (
    <div className={cn("w-full space-y-4", className)}>
      {messages.map((message) => (
        <>
          {message.role === "user" ? (
            <UserMessage key={message.id} message={message} />
          ) : (
            <BotMessage key={message.id} content={message.content} />
          )}
        </>
      ))}
    </div>
  );
};

export default MessageHistory;
