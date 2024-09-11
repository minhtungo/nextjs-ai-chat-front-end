import Chat from "@/components/private/chat/Chat";
import ChatHeader from "@/components/private/common/ChatHeader";
import { Message } from "@/lib/definitions";
import { FC } from "react";

interface ChatAreaProps {
  userId: string;
  chatId?: string;
  initialMessages?: Message[];
}

const ChatArea: FC<ChatAreaProps> = ({ userId, chatId, initialMessages }) => {
  return (
    <>
      <ChatHeader userId={userId} chatId={chatId} />
      <div className="relative flex h-full w-full flex-col overflow-hidden py-4">
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
