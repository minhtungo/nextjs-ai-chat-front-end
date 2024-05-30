import { UIState } from "@/lib/chat/actions";
import { ExtendedUser } from "@/types/next-auth";
import { FC } from "react";
import { Separator } from "../ui/separator";

interface ChatListProps {
  messages: UIState;
  user?: ExtendedUser;
}

const ChatList: FC<ChatListProps> = ({ messages, user }) => {
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
