import { useChat } from "@/features/chat/store/use-chat";
import { useMessages } from "@/features/chat/store/use-messages";
import { clearPoints } from "@/lib/chat";
import { clearCanvas } from "@/lib/utils";
import {
  ElementRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export const useChatOverlay = (
  drawingPointsRef: MutableRefObject<[number, number][]>,
) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const { setSelectedImageIndex } = useChat();
  const { messages } = useMessages();

  const [isFocusMode, setIsFocusMode] = useState(false);
  const [cursorSize, setCursorSize] = useState(25);

  const canvasRef = useRef<HTMLCanvasElement>();
  const imageRefs = useRef<HTMLImageElement[]>([]);

  const onToggleFocusMode = useCallback(() => {
    if (isFocusMode) {
      clearCanvas(canvasRef);
    }
    setIsFocusMode(!isFocusMode);
    clearPoints(drawingPointsRef);
  }, [isFocusMode]);

  const onNavigateImage = useCallback(
    (index: number) => {
      setSelectedImageIndex(index);
      if (isFocusMode) onToggleFocusMode();
    },
    [isFocusMode],
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ block: "end" });
    }
  }, [messages, scrollRef.current]);

  return {
    isFocusMode,
    onToggleFocusMode,
    canvasRef,
    imageRefs,
    cursorSize,
    setCursorSize,
    onNavigateImage,
  };
};
