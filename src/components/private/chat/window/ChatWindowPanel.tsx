"use client";

import { FC, FormEvent, MutableRefObject, useEffect } from "react";

import PromptForm from "@/components/private/chat/PromptForm";
import { Badge } from "@/components/ui/badge";
import { useChat } from "@/hooks/use-chat";
import { useMessage } from "@/hooks/use-message";
import { useSendMessage } from "@/hooks/use-send-message";
import { getConvexHull } from "@/lib/chat";

interface ChatWindowPanelProps {
  userId?: string;
  isFocusMode: boolean;
  onToggleFocusMode: () => void;
  selectedImage: HTMLImageElement;
  drawingPointsRef: MutableRefObject<[number, number][]>;
}

const ChatWindowPanel: FC<ChatWindowPanelProps> = ({
  userId,
  isFocusMode,
  onToggleFocusMode,
  selectedImage,
  drawingPointsRef,
}) => {
  const { selectedImageIndex, images } = useChat();

  const { resetMessageState } = useMessage();

  const { sendMessage } = useSendMessage({ userId });

  useEffect(() => {
    return () => {
      resetMessageState();
    };
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const focusedImage = {
      url: images[selectedImageIndex!].url,
      annotation: getConvexHull({
        drawingPointsRef,
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
