"use client";

import { FC, FormEvent } from "react";

import { useState } from "react";

import { encodeImage, nanoid } from "@/lib/utils";
import PromptForm from "../../components/PromptForm";
import { User } from "next-auth";
import { useSetChat } from "../../use-chat";
import { useCentrifuge } from "@/hooks/use-centrifuge";
import { Message } from "@/types/chat";
import { PublicationContext } from "centrifuge";

interface ChatPanelProps {
  user: User;
  chatId: string;
}

const ChatPanel: FC<ChatPanelProps> = ({ user, chatId }) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [newMessage, setNewMessage] = useState("");

  const setMessages = useSetChat();

  const { publishMessage } = useCentrifuge({
    channel: chatId,
    userId: user.id!,
    onPublication: (message: Message) => {
      setMessages((currentMessages) => [...currentMessages, message]);
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newMessage || newMessage.trim() === "") {
      return;
    }

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // @ts-ignore
      e.target["message"]?.blur();
    }

    const encodedImage = await encodeImage(file);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: nanoid(),
        content: newMessage,
        image: encodedImage,
        role: "user",
        userId: user?.id!,
      },
    ]);

    setNewMessage("");
    setFile(undefined);
    await publishMessage(newMessage);

    // Submit and get response message
    // const responseMessage = await submitUserMessage(content, encodedImage);
    // setMessages((currentMessages) => [...currentMessages, responseMessage]);
  };

  return (
    <div className="mx-auto mb-4 w-full max-w-5xl px-4 lg:px-6">
      <PromptForm
        onSubmit={onSubmit}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        file={file}
        setFile={setFile}
      />
    </div>
  );
};

export default ChatPanel;
