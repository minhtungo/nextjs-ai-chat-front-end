"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDraw } from "@/hooks/use-draw";
import { drawLine } from "@/lib/draw";
import { chatStore } from "@/store/chat";
import { Eraser, Paintbrush, X } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import ChatPanel from "./ChatPanel";
import ImageMasker from "./ImageMasker";
import LineWidthSlider from "./LineWidthSlider";
import MessageHistory from "./MessageHistory";

interface ChatOverlayViewProps {
  user: User;
}

const ChatOverlayView: FC<ChatOverlayViewProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [lineWidth, setLineWidth] = useState(25);

  const imageRef = useRef(null);

  const { clear, onMouseDown, canvasRef, exportDrawingAsBlob } = useDraw(
    ({ prevPoint, currentPoint, ctx }) => {
      drawLine({
        prevPoint,
        currentPoint,
        ctx,
        color: "#000",
        lineWidth,
      });
    },
  );

  const {
    store: [
      {
        overlay: { isOpen, selectedImage },
        messages,
      },
      setChat,
    ],
  } = chatStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-accent transition duration-300 ease-in-out">
      <div className="flex">
        <div className="flex-grow overflow-auto">
          <div className="flex h-full w-full flex-col">
            <div className="mb-6 flex w-full items-center gap-x-2 px-4 pt-2">
              {isEditing && (
                <div className="flex gap-x-4">
                  <LineWidthSlider setLineWidth={setLineWidth} />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-background/60"
                    onClick={clear}
                  >
                    <Eraser className="size-6" />
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
                  <Paintbrush className="size-6" />
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
                  <X className="size-6" />
                </Button>
              </div>
            </div>
            <div className="relative mx-auto flex h-fit max-w-[50%]">
              {isEditing && (
                <div className="absolute inset-0">
                  <div className="relative cursor-crosshair">
                    <ImageMasker
                      onMouseDown={onMouseDown}
                      canvasRef={canvasRef}
                      imageRef={imageRef}
                    />
                  </div>
                </div>
              )}
              <Image
                ref={imageRef}
                src={selectedImage!}
                width={1024}
                height={1024}
                className="h-auto w-full object-cover"
                alt="Image"
              />
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
            <ChatPanel className="w-full px-4 pb-4" user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatOverlayView;
