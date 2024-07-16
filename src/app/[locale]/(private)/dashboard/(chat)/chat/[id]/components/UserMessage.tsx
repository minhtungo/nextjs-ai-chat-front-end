import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FC } from "react";

import { Card } from "@/components/ui/card";
import { Message } from "@/types/chat";
import Image from "next/image";
import CreateThreadSheet from "./CreateThread";
import DocPreview from "./DocPreview";
import { chatStore } from "@/store/chat";
import {
  MessageSquare,
  MessageSquareShare,
  MessageSquareText,
  Paintbrush,
} from "lucide-react";

interface UserMessageProps {
  message: Message;
}

const UserMessage: FC<UserMessageProps> = ({ message }) => {
  const { content, images, files } = message;
  const {
    store: [
      {
        overlay: { isOpen },
      },
      setChat,
    ],
  } = chatStore();

  return (
    <div className="space-y-2">
      <div className="mt-3 flex flex-col items-end gap-y-2">
        {images.length > 0 && (
          <div className="flex max-w-72 flex-row flex-wrap items-center justify-end gap-1">
            {images.map((image) => (
              <div
                role={!isOpen ? "button" : "img"}
                className="relative max-h-40 overflow-hidden rounded-lg"
                onClick={() => {
                  if (!isOpen) {
                    setChat((prev) => ({
                      ...prev,
                      overlay: {
                        isOpen: true,
                        selectedImage: image,
                      },
                    }));
                  }
                }}
              >
                <Image
                  src={image}
                  height={300}
                  width={300}
                  alt={`${message.userId}-image-message`}
                  className="max-h-40 w-full rounded-lg border-border"
                />
                {!isOpen && (
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-background/50 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                    <MessageSquareShare className="size-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {files.length > 0 && (
          <div className="flex max-w-72 flex-row flex-wrap items-center justify-end gap-1">
            {files.map((file) => (
              <DocPreview name={file} />
            ))}
          </div>
        )}
      </div>
      <Card className="ml-auto w-fit bg-secondary p-2 text-right sm:px-3 sm:py-2">
        {content}
      </Card>
    </div>
  );
};

export default UserMessage;
