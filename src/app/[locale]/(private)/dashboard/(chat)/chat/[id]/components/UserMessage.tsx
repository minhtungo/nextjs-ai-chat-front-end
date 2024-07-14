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

interface UserMessageProps {
  message: Message;
}

const UserMessage: FC<UserMessageProps> = ({ message }) => {
  const { content, images, files } = message;

  return (
    <div className="space-y-1.5">
      <Card className="ml-auto w-fit bg-secondary p-3 sm:px-4 sm:py-3">
        {content}
        {images.length > 0 ||
          (files.length > 0 && (
            <div className="mt-3 flex flex-col items-end gap-1">
              <div className="flex max-w-72 flex-row flex-wrap items-center justify-end gap-1">
                {images &&
                  images.length > 0 &&
                  images.map((image) => (
                    <Image
                      src={image}
                      height={300}
                      width={300}
                      alt={`${message.userId}-image-message`}
                      className="max-h-32 w-full rounded-lg border-border"
                    />
                  ))}
              </div>
              <div className="flex max-w-72 flex-row flex-wrap items-center justify-end gap-1">
                {files &&
                  files.length > 0 &&
                  files.map((file) => <DocPreview name={file} />)}
              </div>
            </div>
          ))}
      </Card>
      <TooltipProvider delayDuration={100}>
        <div className="ml-auto items-center justify-end gap-[2px] text-right text-muted-foreground">
          <Tooltip>
            <TooltipTrigger asChild>
              <CreateThreadSheet message={message} />
            </TooltipTrigger>
            <TooltipContent side="bottom">Create thread</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default UserMessage;
