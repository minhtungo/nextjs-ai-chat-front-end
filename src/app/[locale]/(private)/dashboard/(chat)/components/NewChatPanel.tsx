"use client";

import { FC, FormEvent } from "react";
import PromptForm from "./PromptForm";

import { encodeImage, nanoid } from "@/lib/utils";
import { PROTECTED_BASE_URL } from "@/routes";
import { User } from "next-auth";
import { useState } from "react";
import { useSetChat } from "../use-chat";
import {
  useGetSubmitContent,
  useSetMathEquation,
  useSetMessage,
} from "../use-message";

interface NewChatPanelProps {
  user: User;
}

const NewChatPanel: FC<NewChatPanelProps> = ({ user }) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const setMathEquation = useSetMathEquation();
  const setMessage = useSetMessage();
  const submitContent = useGetSubmitContent();

  const setMessages = useSetChat();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!submitContent || submitContent.trim() === "") {
      return;
    }

    const chatId = nanoid();

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

    // Call API to create a new chat room
    // const responseMessage = await submitUserMessage(content, encodedImage);
    //Wait for the backend to confirm the creation of the chat room and return the chat room ID.

    // Submit and get response message
    // setMessages((currentMessages) => [...currentMessages, responseMessage]);
    window.history.replaceState({}, "", `${PROTECTED_BASE_URL}/chat/${chatId}`);
  };

  return (
    <div className="mx-auto mb-4 w-full max-w-5xl px-4 lg:px-6">
      <PromptForm onSubmit={onSubmit} file={file} setFile={setFile} />
    </div>
  );
};

export default NewChatPanel;
