"use client";

import { FC, useEffect } from "react";

import ChatHistory from "@/components/private/chat/ChatHistory";
import { User } from "next-auth";
import ChatPanel from "./ChatPanel";
import { chatStore } from "@/store/chat";
import ChatOverlayView from "@/components/private/chat/ChatOverlayView";
import { ChatRoom } from "@/types/chat";

interface ChatProps extends React.ComponentProps<"div"> {
  user: User;
  chat: ChatRoom;
}

const Chat: FC<ChatProps> = ({ user, chat }) => {
  const {
    chat: { selectedImageIndex },
    setChat,
  } = chatStore();

  useEffect(() => {
    setChat((prev) => ({
      ...prev,
      id: chat.id,
      subject: chat.subject,
      title: chat.title,
    }));
  }, []);

  return (
    <>
      <ChatHistory chat={chat} user={user} />
      <ChatPanel userId={user.id!} chatId={chat.id} />
      {selectedImageIndex !== null && (
        <ChatOverlayView chat={chat} user={user} />
      )}
    </>
  );
};

export default Chat;
