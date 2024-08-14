"use client";

import OverlayWindow from "@/components/common/OverlayWindow";
import { ImageMaskEditor } from "@/components/private/chat/ImageMaskEditor";
import { Button } from "@/components/ui/button";
import { useMessageImages } from "@/data/queries/use-message-images";
import { useChatOverlay } from "@/hooks/use-chat-overlay";
import { clearCanvas } from "@/lib/utils";
import { chatStore } from "@/store/chat";
import "@/styles/draw.css";
import { Eraser, Paintbrush, X } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import LineWidthSlider from "../LineWidthSlider";
import SlidesNav from "@/components/private/chat/window/SlidesNav";
import ChatWindowPanel from "@/components/private/chat/window/ChatWindowPanel";

interface ChatWindowAreaProps {
  userId: string;
  chatId: string;
  children: React.ReactNode;
}

const ChatWindowArea: FC<ChatWindowAreaProps> = ({
  userId,
  chatId,
  children,
}) => {
  const {
    chat: { selectedImageIndex },
    chatImages,
  } = chatStore();

  const imagesQueries = useMessageImages(
    (chatImages ?? []).map(({ url }) => url!),
  );

  const {
    isFocusMode,
    onToggleFocusMode,
    canvasRef,
    drawingPoints,
    imageRefs,
    updateChatOverlay,
    cursorSize,
    setCursorSize,
    onNavigateImage,
  } = useChatOverlay();

  return (
    <OverlayWindow className="flex">
      <div className="flex-grow overflow-auto">
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex h-14 w-full items-center gap-3 px-4">
            {isFocusMode && (
              <div className="flex gap-3">
                <LineWidthSlider setLineWidth={setCursorSize} />

                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-background/60"
                  onClick={() => clearCanvas(canvasRef)}
                >
                  <Eraser className="size-5" />
                </Button>
              </div>
            )}

            <div className="ml-auto flex gap-2">
              {isFocusMode ? (
                <button
                  className="text-muted-foreground hover:text-foreground"
                  onClick={onToggleFocusMode}
                >
                  Cancel
                </button>
              ) : (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-background/60"
                    onClick={onToggleFocusMode}
                  >
                    {isFocusMode ? "Cancel" : <Paintbrush className="size-5" />}
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
              )}
              {isFocusMode && (
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
          <SlidesNav
            onNavigate={onNavigateImage}
            selectedIndex={selectedImageIndex!}
            total={chatImages.length}
          />
        </div>
      </div>
      <div className="relative w-[450px] shrink-0 bg-background">
        <div className="relative flex h-screen flex-col">
          {children}
          <div className="mb-3 px-4">
            <ChatWindowPanel
              userId={userId!}
              chatId={chatId}
              isFocusMode={isFocusMode}
              onToggleFocusMode={onToggleFocusMode}
              selectedImage={imageRefs.current[selectedImageIndex!]}
              drawingPoints={drawingPoints}
            />
          </div>
        </div>
      </div>
    </OverlayWindow>
  );
};

export default ChatWindowArea;
