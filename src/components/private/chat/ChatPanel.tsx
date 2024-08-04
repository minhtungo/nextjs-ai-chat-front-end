"use client";

import { FC, FormEvent, useEffect } from "react";

import { nanoid } from "@/lib/utils";
import { User } from "next-auth";
import PromptForm from "./PromptForm";

import { saveChatAction } from "@/actions/chat";
import { useSubscription } from "@/store/centrifuge";
import { chatStore } from "@/store/chat";
import { useMessageStore } from "@/store/message";

interface ChatPanelProps {
  user: User;
  chatId: string;
}

const ChatPanel: FC<ChatPanelProps> = ({ user, chatId }) => {
  const {
    store: [chat, setChat],
  } = chatStore();

  const {
    messageStore: { files, mathEquation, message, isPending },
    clearMessageStore,
  } = useMessageStore();

  const channel = `rooms:${chatId}`;
  const sub = useSubscription(channel);

  useEffect(() => {
    clearMessageStore();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) return;

    const submitContent = mathEquation || message;

    if (!submitContent || submitContent.trim() === "") {
      return;
    }

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // @ts-ignore
      e.target["message"]?.blur();
    }

    const newMessage = {
      id: nanoid(),
      content: submitContent,
      files,
      role: "user",
      userId: user?.id!,
      chatId: chat.id!,
    };

    setChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      ...(prev.messages.length === 0 && {
        title: newMessage.content.substring(0, 25),
      }),
    }));

    clearMessageStore();

    await saveChatAction({
      message: newMessage,
      chatId: chat.id!,
      title:
        chat.messages.length === 0 ? newMessage.content.substring(0, 25) : null,
    });

    if (sub) {
      sub.publish({
        content: submitContent,
        images: files
          .filter((file) => file.type === "image")
          .map((file) => file.url!),
        docs: files
          .filter((file) => file.type === "document")
          .map((file) => file.url!),
      });
    }

    // Submit and get response message
    // const responseMessage = await submitUserMessage(content, encodedImage);
    // setMessages((currentMessages) => [...currentMessages, responseMessage]);
  };

  return <PromptForm onSubmit={onSubmit} />;
};

export default ChatPanel;
