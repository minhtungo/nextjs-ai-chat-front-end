"use client";

import { FC, FormEvent, MutableRefObject, useEffect } from "react";

import PromptForm from "@/components/private/chat/PromptForm";
import { Badge } from "@/components/ui/badge";
import { useChat } from "@/hooks/use-chat";
import { useSendMessage } from "@/hooks/use-send-message";
import { getConvexHull } from "@/lib/chat";
import { useSub } from "@/store/centrifuge";
import { useMessageStore } from "@/store/message";

interface ChatWindowPanelProps {
  userId: string;
  chatId: string;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  selectedImage: HTMLImageElement;
  drawingPoints: MutableRefObject<[number, number][]>;
}

const ChatWindowPanel: FC<ChatWindowPanelProps> = ({
  userId,
  chatId,
  isFocusMode,
  onToggleFocusMode,
  selectedImage,
  drawingPoints,
}) => {
  const { selectedImageIndex, images } = useChat();

  const { clearMessageStore } = useMessageStore();

  const sub = useSub();
  const { sendMessage } = useSendMessage({ userId, sub, chatId });

  useEffect(() => {
    return () => {
      clearMessageStore();
    };
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const focusedImage = {
      url: images[selectedImageIndex!].url,
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
