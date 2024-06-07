import { UIState } from "@/lib/chat/actions";
import { FC } from "react";

interface ChatListProps {
  messages: UIState;
}

const ChatList: FC<ChatListProps> = ({ messages }) => {
  if (!messages.length) {
    return null;
  }

  return (
    <>
      {messages.map((message, index) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.display}
        </div>
      ))}
    </>
  );
};

export default ChatList;
