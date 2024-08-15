import { useChat } from "@/hooks/use-chat";
import { useMessages } from "@/hooks/use-messages";
import { clearCanvas } from "@/lib/utils";
import { ElementRef, useCallback, useEffect, useRef, useState } from "react";

export const useChatOverlay = () => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const { setSelectedImageIndex } = useChat();
  const { messages } = useMessages();

  const [isFocusMode, setIsFocusMode] = useState(false);
  const [cursorSize, setCursorSize] = useState(25);

  const canvasRef = useRef<HTMLCanvasElement>();
  const drawingPoints = useRef<Array<[number, number]>>([]);
  const imageRefs = useRef<HTMLImageElement[]>([]);

  const updateChatOverlay = useCallback((selectedImageIndex: number | null) => {
    setSelectedImageIndex(selectedImageIndex);
  }, []);

  const onToggleFocusMode = useCallback(() => {
    if (isFocusMode) {
      clearCanvas(canvasRef);
    }
    setIsFocusMode(!isFocusMode);
  }, [isFocusMode]);

  const onNavigateImage = useCallback(
    (index: number) => {
      updateChatOverlay(index);
      if (isFocusMode) onToggleFocusMode();
    },
    [isFocusMode],
  );

  useEffect(() => {
    const handleClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        updateChatOverlay(null);
      }
    };

    document.addEventListener("keydown", handleClose);

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ block: "end" });
    }
  }, [messages, scrollRef.current]);

  return {
    isFocusMode,
    onToggleFocusMode,
    canvasRef,
    drawingPoints,
    imageRefs,
    updateChatOverlay,
    cursorSize,
    setCursorSize,
    onNavigateImage,
  };
};
