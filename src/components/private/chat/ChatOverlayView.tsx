"use client";

import ChatHistory from "@/components/private/chat/ChatHistory";
import ChatOverlayPanel from "@/components/private/chat/ChatOverlayPanel";
import { ImageMaskEditor } from "@/components/private/chat/ImageMaskEditor";
import { Button } from "@/components/ui/button";
import { useMessageImages } from "@/data/queries/use-message-images";
import { chatStore } from "@/store/chat";
import "@/styles/draw.css";
import convexHull from "convex-hull";
import { ChevronLeft, ChevronRight, Eraser, Paintbrush, X } from "lucide-react";
import Image from "next/image";
import {
  ElementRef,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import LineWidthSlider from "./LineWidthSlider";

interface ChatOverlayViewProps {
  userId: string;
  chatId: string;
}

const ChatOverlayView: FC<ChatOverlayViewProps> = ({ userId, chatId }) => {
  const {
    chat: { selectedImageIndex },
    chatImages,
    messages,
    setChat,
  } = chatStore();

  const scrollRef = useRef<ElementRef<"div">>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [cursorSize, setCursorSize] = useState(25);

  const drawingPoints = useRef<Array<[number, number]>>([]);
  const imageRefs = useRef<HTMLImageElement[]>([]);

  const imagesQueries = useMessageImages(
    (chatImages ?? []).map(({ url }) => url!),
  );

  const canvasRef = useRef<HTMLCanvasElement>();

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getConvexHull = useCallback(() => {
    if (drawingPoints.current.length < 3) return [];
    console.log("drawingPoints", drawingPoints.current);
    console.log("convel hull", convexHull(drawingPoints.current));
    return convexHull(drawingPoints.current) as Array<[number, number]>;
  }, [drawingPoints]);

  const updateChatOverlay = (selectedImageIndex: number | null) => {
    setChat((prevState) => ({
      ...prevState,
      selectedImageIndex,
    }));
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [messages, scrollRef.current]);

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

  const onToggleEditing = () => {
    if (isEditing) {
      clear();
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="fixed inset-0 z-50 bg-accent transition">
      <div className="flex duration-300 ease-in-out">
        <div className="flex-grow overflow-auto">
          <div className="flex h-full w-full flex-col justify-between">
            <div className="flex h-14 w-full items-center gap-3 px-4">
              {isEditing && (
                <div className="flex gap-3">
                  <LineWidthSlider setLineWidth={setCursorSize} />

                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-background/60"
                    onClick={clear}
                  >
                    <Eraser className="size-5" />
                  </Button>
                  <button onClick={getConvexHull}>Get Convex Hull</button>
                </div>
              )}

              <div className="ml-auto flex gap-2">
                {isEditing ? (
                  <button
                    className="text-muted-foreground hover:text-foreground"
                    onClick={onToggleEditing}
                  >
                    Cancel
                  </button>
                ) : (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-background/60"
                      onClick={onToggleEditing}
                    >
                      {isEditing ? "Cancel" : <Paintbrush className="size-5" />}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="hover:bg-background/60"
                      onClick={() => updateChatOverlay(null)}
                    >
                      <X className="size-5" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="relative mx-auto w-fit">
                {imagesQueries[selectedImageIndex!]?.data && (
                  <>
                    <Image
                      src={imagesQueries[selectedImageIndex!]?.data?.imageSrc!}
                      ref={(el) => {
                        if (el && imageRefs.current) {
                          imageRefs.current[selectedImageIndex!] = el;
                        }
                      }}
                      width={1024}
                      height={1024}
                      className="h-auto max-h-[100vh] w-fit max-w-full"
                      alt="Image"
                    />
                  </>
                )}
                {isEditing && (
                  <div className="absolute inset-0 z-10 cursor-crosshair">
                    <div className="relative">
                      <ImageMaskEditor
                        canvasRef={canvasRef}
                        image={imageRefs.current[selectedImageIndex!]}
                        cursorSize={cursorSize}
                        drawingPoints={drawingPoints.current}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex h-14 w-full items-center justify-center gap-1 text-base text-muted-foreground">
              <button
                className="p-2 text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => {
                  updateChatOverlay(selectedImageIndex! - 1);
                  if (isEditing) onToggleEditing();
                }}
                disabled={selectedImageIndex === 0}
              >
                <ChevronLeft className="size-4" />
              </button>
              Image {selectedImageIndex! + 1} of {chatImages.length}
              <button
                className="p-2 text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => {
                  updateChatOverlay(selectedImageIndex! + 1);
                  if (isEditing) onToggleEditing();
                }}
                disabled={selectedImageIndex === chatImages.length - 1}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-[450px] shrink-0 bg-background">
          <div className="relative flex h-screen flex-col">
            <ChatHistory
              chatId={chatId}
              userId={userId}
              messageClassName="py-4"
            />
            <div className="mb-3 px-4">
              <ChatOverlayPanel
                userId={userId!}
                getConvexHull={getConvexHull}
                isEditing={isEditing}
                onToggleEditing={onToggleEditing}
                selectedImageUrl={chatImages[selectedImageIndex!]?.url!}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatOverlayView;
