import { FC } from "react";

import ChatHistory from "@/components/private/chat/ChatHistory";
import { Chat as ChatRoom } from "@/types/chat";
import { User } from "next-auth";
import ChatPanel from "./ChatPanel";

interface ChatProps extends React.ComponentProps<"div"> {
  user: User;
  chat: ChatRoom;
}

const Chat: FC<ChatProps> = ({ user, chat }) => {
  return (
    <>
      <ChatHistory chat={chat} user={user} />
      <ChatPanel userId={user.id!} chatId={chat.id} />
    </>
  );
};

export default Chat;
