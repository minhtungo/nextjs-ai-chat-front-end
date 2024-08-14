import { FC } from "react";

import ChatHistory from "@/components/private/chat/ChatHistory";
import ChatWindow from "@/components/private/chat/window/ChatWindow";
import ChatPanel from "./ChatPanel";

interface ChatProps extends React.ComponentProps<"div"> {
  userId: string;
  chatId: string;
}

const Chat: FC<ChatProps> = ({ userId, chatId }) => {
  return (
    <>
      <ChatHistory chatId={chatId} userId={userId} />
      <ChatPanel userId={userId} chatId={chatId} />
      <ChatWindow chatId={chatId} userId={userId} />
    </>
  );
};

export default Chat;
