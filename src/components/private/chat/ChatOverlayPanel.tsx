"use client";

import { FC, FormEvent, MutableRefObject, useEffect } from "react";

import PromptForm from "./PromptForm";

import { Badge } from "@/components/ui/badge";
import { createNewMessageStore, getMessageFiles } from "@/lib/chat";
import { useSub } from "@/store/centrifuge";
import { chatStore } from "@/store/chat";
import { useMessageStore } from "@/store/message";
import { useConvexHull } from "@/hooks/use-convex-hull";

interface ChatOverlayPanelProps {
  userId: string;
  isEditing: boolean;
  onToggleEditing: () => void;
  selectedImage: HTMLImageElement;
  drawingPoints: MutableRefObject<[number, number][]>;
}

const ChatOverlayPanel: FC<ChatOverlayPanelProps> = ({
  userId,
  isEditing,
  onToggleEditing,
  selectedImage,
  drawingPoints,
}) => {
  const {
    chat: { selectedImageIndex },
    setMessages,
    chatImages,
  } = chatStore();

  const {
    messageStore: { files, mathEquation, message, isPending },
    clearMessageStore,
  } = useMessageStore();

  const annotation = useConvexHull({
    drawingPoints,
    selectedImage,
  });

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

    const selectedImageURl = chatImages[selectedImageIndex!]?.url!;

    // Blur focus on mobile
    if (window.innerWidth < 600) {
      // @ts-ignore
      e.target["message"]?.blur();
    }

    const { images, docs, imagesWithPreview } = getMessageFiles(files);

    if (sub) {
      sub.publish({
        input: {
          content,
          images,
          docs,
          selectedImage: {
            url: selectedImageURl,
            annotation,
          },
        },
      });
    }

    const newMessage = createNewMessageStore({
      content,
      userId,
      docs,
      images: imagesWithPreview,
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
