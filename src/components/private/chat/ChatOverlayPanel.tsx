"use client";

import { FC, FormEvent, useEffect } from "react";

import PromptForm from "./PromptForm";

import { Badge } from "@/components/ui/badge";
import { createNewMessageStore, getMessageFiles } from "@/lib/chat";
import { useSub } from "@/store/centrifuge";
import { chatStore } from "@/store/chat";
import { useMessageStore } from "@/store/message";

interface ChatOverlayPanelProps {
  userId: string;
  getConvexHull: () => number[][];
  isEditing: boolean;
  selectedImageUrl: string;
  onToggleEditing: () => void;
}

const ChatOverlayPanel: FC<ChatOverlayPanelProps> = ({
  userId,
  getConvexHull,
  isEditing,
  selectedImageUrl,
  onToggleEditing,
}) => {
  const { setMessages } = chatStore();

  const {
    messageStore: { files, mathEquation, message, isPending },
    clearMessageStore,
  } = useMessageStore();

  const sub = useSub();

  useEffect(() => {
    clearMessageStore();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) return;

    const content = mathEquation || message;

    if (!content || content.trim() === "") {
      return;
    }

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // @ts-ignore
      e.target["message"]?.blur();
    }

    const { images, docs } = getMessageFiles(files);

    const hull = getConvexHull();

    if (sub) {
      sub.publish({
        input: {
          content,
          images,
          docs,
          selectedImage: {
            url: selectedImageUrl,
            hull,
          },
        },
      });
    }

    const newMessage = createNewMessageStore({
      content,
      userId,
      docs,
      images,
    });

    setMessages((prev) => [...prev, newMessage]);

    onToggleEditing();
    clearMessageStore();
  };

  return (
    <>
      {isEditing && (
        <Badge variant="secondary" className="mb-2">
          Focus on selection
        </Badge>
      )}
      <PromptForm onSubmit={onSubmit} />
    </>
  );
};

export default ChatOverlayPanel;
