"use client";

import { FC, FormEvent, useEffect } from "react";

import { useState } from "react";

import { useCentrifuge } from "@/hooks/use-centrifuge";
import { encodeImage, nanoid } from "@/lib/utils";
import { Message } from "@/types/chat";
import { User } from "next-auth";
import {
  useGetSubmitContent,
  useSetMathEquation,
  useSetMessage,
} from "../../../use-message";
import { useSetChat } from "../../../use-chat";
import PromptForm from "../../../components/PromptForm";

interface ChatPanelProps {
  user: User;
  chatId: string;
}

const ChatPanel: FC<ChatPanelProps> = ({ user, chatId }) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const setMathEquation = useSetMathEquation();
  const setMessage = useSetMessage();
  const submitContent = useGetSubmitContent();

  const setMessages = useSetChat();

  useEffect(() => {
    if (submitContent) {
      setMessage("");
      setMathEquation("");
    }
  }, []);

  const { publishMessage } = useCentrifuge({
    channel: chatId,
    userId: user.id!,
    onPublication: (message: Message) => {
      setMessages((currentMessages) => [...currentMessages, message]);
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!submitContent || submitContent.trim() === "") {
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
        content: submitContent,
        image: encodedImage,
        role: "user",
        userId: user?.id!,
      },
    ]);

    alert(submitContent);

    setMessage("");
    setMathEquation("");
    setFile(undefined);

    await publishMessage(submitContent);

    // Submit and get response message
    // const responseMessage = await submitUserMessage(content, encodedImage);
    // setMessages((currentMessages) => [...currentMessages, responseMessage]);
  };

  return (
    <div className="mx-auto mb-4 w-full max-w-5xl px-4 lg:px-6">
      <PromptForm onSubmit={onSubmit} file={file} setFile={setFile} />
    </div>
  );
};

export default ChatPanel;
