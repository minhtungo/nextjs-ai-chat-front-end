"use client";

import { Button } from "@/components/ui/button";
import { Paintbrush, X } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import ImageMasker from "./ImageMasker";
import { chatStore } from "@/store/chat";
import MessageHistory from "./MessageHistory";
import { ScrollArea } from "@/components/ui/scroll-area";
import PromptForm from "./PromptForm";
import { User } from "next-auth";
import ChatPanel from "./ChatPanel";

interface ChatOverlayViewProps {
  user: User;
}

const ChatOverlayView: FC<ChatOverlayViewProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    store: [{ isOverlayOpen, messages }, setChat],
  } = chatStore();

  if (!isOverlayOpen) return null;

  const imageSrc = "/images/intro-block-1.webp";

  return (
    <div className="fixed inset-0 z-50 bg-accent">
      <div className="flex">
        <div className="flex-grow overflow-auto">
          <div className="flex h-full w-full flex-col justify-between">
            <div className="flex h-16 w-full items-center justify-end gap-x-2 px-4">
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
                onClick={() =>
                  setChat((prev) => ({ ...prev, isOverlayOpen: false }))
                }
              >
                <X className="size-6" />
              </Button>
            </div>
            <div className="max-w-full">
              {isEditing ? (
                <ImageMasker imageSrc={imageSrc} />
              ) : (
                <Image src={imageSrc} width={1024} height={1024} alt="Image" />
              )}
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
