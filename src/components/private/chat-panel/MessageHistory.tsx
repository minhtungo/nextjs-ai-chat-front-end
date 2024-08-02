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
  if (!messages.length) {
    return null;
  }

  return (
    <div
      className={cn("flex h-full w-full flex-1 flex-col gap-y-4", className)}
    >
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? (
            <UserMessage message={message} />
          ) : (
            <BotMessage content={message.content} />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageHistory;
