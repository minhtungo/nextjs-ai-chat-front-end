"use client";

import { FC, FormEvent, useEffect } from "react";

import { nanoid } from "@/lib/utils";
import { User } from "next-auth";
import PromptForm from "./PromptForm";

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

  const sub = useSubscription(`rooms:${chatId}`);

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

    const images = files
      .filter((file) => file.type === "image")
      .map((file) => ({
        url: file.url!,
        name: file.name,
        type: file.type,
      }));

    const docs = files
      .filter((file) => file.type !== "image")
      .map((file) => ({
        url: file.url!,
        name: file.name,
        type: file.type,
      }));

    if (sub) {
      sub.publish({
        input: {
          content: submitContent,
          images,
          docs,
        },
      });
    }

    const newMessage = {
      id: nanoid(),
      content: submitContent,
      role: "user",
      userId: user?.id!,
      chatId: chat.id!,
      docs,
      images,
      timestamp: new Date().getTime(),
    };

    setChat((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      ...(prev.messages.length === 0 && {
        title: newMessage.content.substring(0, 25),
      }),
      overlay: { isOpen: false, selectedImageIndex: 0 },
    }));

    clearMessageStore();
  };

  return <PromptForm onSubmit={onSubmit} />;
};

export default ChatPanel;
