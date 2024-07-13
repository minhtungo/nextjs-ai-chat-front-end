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

interface UserMessageProps {
  message: Message;
}

const UserMessage: FC<UserMessageProps> = ({ message }) => {
  const { content, image } = message;

  return (
    <div className="space-y-1.5">
      <Card className="ml-auto w-fit bg-secondary p-3 sm:px-4 sm:py-3">
        {content}
        {image && (
          <Image
            src={image}
            height={300}
            alt={`${message.userId}-image-message`}
          />
        )}
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
