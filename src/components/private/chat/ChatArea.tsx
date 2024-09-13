import Chat from "@/components/private/chat/Chat";
import ChatHeader from "@/components/private/common/ChatHeader";
import { Message } from "@/lib/definitions";
import { FC } from "react";

interface ChatAreaProps {
  userId: string;
  chatId?: string;
  chatTitle?: string;
  initialMessages?: Message[];
}

const ChatArea: FC<ChatAreaProps> = ({
  userId,
  chatId,
  chatTitle,
  initialMessages,
}) => {
  return (
    <>
      <ChatHeader userId={userId} chatTitle={chatTitle} />
      <div className="relative flex h-full w-full flex-col overflow-hidden">
        <Chat
          userId={userId}
          chatId={chatId}
          initialMessages={initialMessages}
        />
      </div>
    </>
  );
};

export default ChatArea;
