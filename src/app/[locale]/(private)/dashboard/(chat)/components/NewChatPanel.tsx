"use client";

import { FC, FormEvent } from "react";
import PromptForm from "./PromptForm";

import { nanoid } from "@/lib/utils";
import { PROTECTED_BASE_URL } from "@/routes";
import { useSetChat } from "@/store/chat";
import { User } from "next-auth";
import {
  useFiles,
  useGetSubmitContent,
  useMathEquation,
  useMessage,
} from "@/store/message";

interface NewChatPanelProps {
  user: User;
}

const NewChatPanel: FC<NewChatPanelProps> = ({ user }) => {
  const { setMathEquation } = useMathEquation();
  const { setMessage } = useMessage();
  const submitContent = useGetSubmitContent();
  const {
    files: [files, setFiles],
  } = useFiles();

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

    // const encodedImage = await encodeImage(files);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: nanoid(),
        content: submitContent,
        image: null,
        role: "user",
        userId: user?.id!,
      },
    ]);

    alert(submitContent);

    setMessage("");
    setMathEquation("");
    setFiles([]);

    // Call API to create a new chat room
    // const responseMessage = await submitUserMessage(content, encodedImage);
    //Wait for the backend to confirm the creation of the chat room and return the chat room ID.

    // Submit and get response message
    // setMessages((currentMessages) => [...currentMessages, responseMessage]);
    window.history.replaceState({}, "", `${PROTECTED_BASE_URL}/chat/${chatId}`);
  };

  return (
    <div className="mx-auto mb-4 w-full max-w-5xl px-4 lg:px-6">
      <PromptForm onSubmit={onSubmit} />
    </div>
  );
};

export default NewChatPanel;
