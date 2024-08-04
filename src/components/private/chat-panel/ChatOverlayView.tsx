"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDraw } from "@/hooks/use-draw";
import { drawLine } from "@/lib/draw";
import { chatStore } from "@/store/chat";
import { ChevronLeft, ChevronRight, Eraser, Paintbrush, X } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import ChatPanel from "./ChatPanel";
import ImageMasker from "./ImageMasker";
import LineWidthSlider from "./LineWidthSlider";
import MessageHistory from "./MessageHistory";

interface ChatOverlayViewProps {
  user: User;
}

const ChatOverlayView: FC<ChatOverlayViewProps> = ({ user }) => {
  const {
    store: [
      {
        overlay: { selectedImageIndex },
        messages,
        id,
      },
      setChat,
    ],
    updateChatOverlay,
    chatImagesArray,
  } = chatStore();

  const [isEditing, setIsEditing] = useState(false);
  const [lineWidth, setLineWidth] = useState(25);

  const imageRefs = useRef([]);

  const { clear, onMouseDown, canvasRef, getConvexHull } = useDraw(
    ({ prevPoint, currentPoint, ctx }) => {
      drawLine({
        prevPoint,
        currentPoint,
        ctx,
        lineWidth,
      });
    },
  );

  useEffect(() => {
    const handleClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        updateChatOverlay({
          isOpen: false,
          selectedImageIndex: 0,
        });
      }
    };

    document.addEventListener("keydown", handleClose);

    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-accent transition">
      <div className="flex duration-300 ease-in-out">
        <div className="flex-grow overflow-auto">
          <div className="flex h-full w-full flex-col justify-between">
            <div className="flex h-14 w-full items-center gap-3 px-4">
              {isEditing && (
                <div className="flex gap-3">
                  <LineWidthSlider setLineWidth={setLineWidth} />
                  <Button
                    onClick={() => {
                      const hull = getConvexHull();
                      console.log("---------hull", hull);
                    }}
                    variant="outline"
                  >
                    Test Get Convex Hull
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-background/60"
                    onClick={clear}
                  >
                    <Eraser className="size-5" />
                  </Button>
                </div>
              )}

              <div className="ml-auto flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-background/60"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Paintbrush className="size-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-background/60"
                  onClick={() => {
                    setIsEditing(false);
                    setChat((prev) => ({
                      ...prev,
                      overlay: { ...prev.overlay, isOpen: false },
                    }));
                  }}
                >
                  <X className="size-5" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="relative mx-auto w-fit">
                <Image
                  src={chatImagesArray[selectedImageIndex].url!}
                  ref={(el) => (imageRefs.current[selectedImageIndex] = el)}
                  width={1024}
                  height={1024}
                  className="h-auto max-h-[100vh] w-fit max-w-full"
                  alt="Image"
                />
                {isEditing && (
                  <div className="absolute inset-0 z-10 cursor-crosshair">
                    <div className="relative">
                      <ImageMasker
                        onMouseDown={onMouseDown}
                        canvasRef={canvasRef}
                        image={imageRefs.current[selectedImageIndex]}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex h-14 w-full items-center justify-center gap-3 text-base text-muted-foreground">
              <button
                className="text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => {
                  updateChatOverlay({
                    isOpen: true,
                    selectedImageIndex: selectedImageIndex - 1,
                  });
                  if (isEditing) {
                    clear();
                    setIsEditing(false);
                  }
                }}
                disabled={selectedImageIndex === 0}
              >
                <ChevronLeft className="size-4" />
              </button>
              Image {selectedImageIndex + 1} of {chatImagesArray.length}
              <button
                className="text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => {
                  updateChatOverlay({
                    isOpen: true,
                    selectedImageIndex: selectedImageIndex + 1,
                  });
                  if (isEditing) {
                    clear();
                    setIsEditing(false);
                  }
                }}
                disabled={selectedImageIndex === chatImagesArray.length - 1}
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="relative w-[450px] shrink-0 bg-background">
          <div className="relative flex h-screen flex-col">
            <ScrollArea className="flex h-full w-full flex-1 flex-col py-4 lg:py-6">
              <MessageHistory
                messages={messages}
                className="px-4 sm:pl-4 sm:pr-6"
              />
            </ScrollArea>
            <ChatPanel className="w-full px-4 pb-4" user={user} chatId={id!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatOverlayView;
