"use client";

import { FC, FormEvent, MutableRefObject, useEffect } from "react";

import PromptForm from "@/components/private/chat/PromptForm";
import { Badge } from "@/components/ui/badge";
import { useSendMessage } from "@/hooks/use-send-message";
import { useSub } from "@/store/centrifuge";
import { chatStore } from "@/store/chat";
import { useMessageStore } from "@/store/message";
import { getConvexHull } from "@/lib/chat";

interface ChatWindowPanelProps {
  userId: string;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  selectedImage: HTMLImageElement;
  drawingPoints: MutableRefObject<[number, number][]>;
}

const ChatWindowPanel: FC<ChatWindowPanelProps> = ({
  userId,
  isFocusMode,
  onToggleFocusMode,
  selectedImage,
  drawingPoints,
}) => {
  const {
    chat: { selectedImageIndex },
    chatImages,
  } = chatStore();

  const { clearMessageStore } = useMessageStore();

  const sub = useSub();
  const { sendMessage } = useSendMessage({ userId, sub });

  useEffect(() => {
    return () => {
      clearMessageStore();
    };
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const focusedImage = {
      url: chatImages[selectedImageIndex!].url,
      annotation: getConvexHull({
        drawingPoints,
        selectedImage,
      }),
    };

    sendMessage({ focusedImage });

    onToggleFocusMode();
  };

  return (
    <>
      {isFocusMode && (
        <Badge variant="secondary" className="mb-2">
          Focus on selection
        </Badge>
      )}
      <PromptForm onSubmit={onSubmit} />
    </>
  );
};

export default ChatWindowPanel;
