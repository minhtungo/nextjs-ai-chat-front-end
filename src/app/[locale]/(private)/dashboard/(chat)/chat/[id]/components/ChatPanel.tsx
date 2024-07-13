"use client";

import { FC, FormEvent, useEffect } from "react";

import { nanoid } from "@/lib/utils";
import { put } from "@vercel/blob";
import { User } from "next-auth";
import PromptForm from "./PromptForm";

import { chatStore } from "@/store/chat";
import {
  filesStore,
  mathEquationStore,
  messageStore,
  submitContentStore,
} from "@/store/message";

interface ChatPanelProps {
  user: User;
}

const ChatPanel: FC<ChatPanelProps> = ({ user }) => {
  const {
    store: [{ id, messages }, setChat],
  } = chatStore();
  const { setMathEquation } = mathEquationStore();
  const { setMessage } = messageStore();
  const {
    store: [files, setFiles],
  } = filesStore();
  const submitContent = submitContentStore();

  useEffect(() => {
    if (submitContent) {
      setMessage("");
      setMathEquation("");
      setFiles([]);
    }
  }, []);

  // const { publishMessage } = useCentrifuge({
  //   channel: id!,
  //   userId: user.id!,
  //   onPublication: (message: Message) => {
  //     setChat((prev) => ({
  //       ...prev,
  //       messages: [...prev.messages, message],
  //     }));
  //   },
  // });

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

    let blob = null;

    if (files && files.length > 0) {
      blob = await put("images", URL.createObjectURL(files[0]), {
        access: "public",
        token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN!,
      });
    }

    // const encodedImage = await encodeImage(file);

    setChat((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: nanoid(),
          content: submitContent,
          image: blob?.url || null,
          role: "user",
          userId: user?.id!,
          chatId: id!,
        },
      ],
    }));

    alert(submitContent);

    setMessage("");
    setMathEquation("");
    setFiles([]);

    // await publishMessage(submitContent);

    // Submit and get response message
    // const responseMessage = await submitUserMessage(content, encodedImage);
    // setMessages((currentMessages) => [...currentMessages, responseMessage]);
  };

  return (
    <div className="mx-auto mb-4 w-full max-w-5xl px-4 lg:px-6">
      <PromptForm onSubmit={onSubmit} />
    </div>
  );
};

export default ChatPanel;
