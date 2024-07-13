import { Message } from "@/types/chat";
import { FC } from "react";
import UserMessage from "./UserMessage";
import BotMessage from "./BotMessage";

interface ChatListProps {
  messages: Message[];
}

const ChatList: FC<ChatListProps> = ({ messages }) => {
  if (!messages.length) {
    return null;
  }

  return (
    <>
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === "user" ? (
            <UserMessage message={message} />
          ) : (
            <BotMessage content={message.content} />
          )}
        </div>
      ))}
    </>
  );
};

export default ChatList;
