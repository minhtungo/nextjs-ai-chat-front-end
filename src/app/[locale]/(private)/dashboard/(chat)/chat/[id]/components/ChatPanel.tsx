"use client";

import { FC, FormEvent, useEffect } from "react";

import { cn, nanoid } from "@/lib/utils";
import { put } from "@vercel/blob";
import { User } from "next-auth";
import PromptForm from "./PromptForm";

import { saveChatAction } from "@/actions/chat";
import { chatStore } from "@/store/chat";
import {
  filesStore,
  mathEquationStore,
  messageStore,
  submitContentStore,
} from "@/store/message";

interface ChatPanelProps {
  user: User;
  className?: string;
}

const ChatPanel: FC<ChatPanelProps> = ({ user, className }) => {
  const {
    store: [chat, setChat],
  } = chatStore();
  const { setMathEquation } = mathEquationStore();
  const { setMessage } = messageStore();
  const {
    store: [files, setFiles],
  } = filesStore();

  const submitContent = submitContentStore();

  useEffect(() => {
    setMessage("");
    setMathEquation("");
    setFiles([]);
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

  const handleUpload = async () => {
    if (!files.length) return;

    try {
      const uploads = Array.from(files).map(async (file) => {
        const blob = await put("images", file, {
          access: "public",
          token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
        });
        return blob;
      });

      return await Promise.all(uploads);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
    }
  };

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
      blob = await put("images", files[0], {
        access: "public",
        token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN!,
      });
    }

    const blobs = await handleUpload();
    const images = blobs ? blobs.map((blob) => blob.url) : [];

    // const encodedImage = await encodeImage(file);

    setChat((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: nanoid(),
          content: submitContent,
          images: images,
          files: [],
          role: "user",
          userId: user?.id!,
          chatId: chat.id!,
        },
      ],
    }));

    setMessage("");
    setMathEquation("");
    setFiles([]);

    await saveChatAction({
      chat,
      userId: user.id!,
    });

    // await publishMessage(submitContent);

    // Submit and get response message
    // const responseMessage = await submitUserMessage(content, encodedImage);
    // setMessages((currentMessages) => [...currentMessages, responseMessage]);
  };

  return (
    <div
      className={cn(
        className ? className : "mx-auto mb-4 w-full max-w-5xl px-4 lg:px-6",
      )}
    >
      <PromptForm onSubmit={onSubmit} />
    </div>
  );
};

export default ChatPanel;
