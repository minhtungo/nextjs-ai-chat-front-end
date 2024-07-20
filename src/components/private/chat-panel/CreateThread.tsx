"use client";

import SheetWrapper from "@/components/common/SheetWrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Message } from "@/types/chat";
import { MessageCircleReply } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

const Trigger = () => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="xs">
            <MessageCircleReply className="h-3.5 w-3.5 bg-blue-500" />
            <span className="sr-only">Create thread</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Create thread</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface ThreadContentProps {
  input: string;
  setInput: (value: string) => void;
  message: Message;
}

const ThreadContent = ({ input, setInput, message }: ThreadContentProps) => {
  return (
    <div className="flex h-full flex-1 flex-col justify-between">
      <Card className="ml-auto w-fit bg-secondary p-3 text-sm sm:px-4 sm:py-3">
        {message.content}
        {message.image && (
          <Image
            src={message.image}
            height={300}
            alt={`${message.userId}-image-message`}
          />
        )}
      </Card>
      <div className="absolute bottom-3 left-0 w-full px-4">
        {/* <PromptForm /> */}
      </div>
    </div>
  );
};

interface CreateThreadSheetProps {
  message: Message;
}

const CreateThreadSheet: FC<CreateThreadSheetProps> = ({ message }) => {
  const [input, setInput] = useState("");
  return (
    <SheetWrapper
      trigger={<Trigger />}
      title={"Create Thread"}
      content={
        <ThreadContent input={input} setInput={setInput} message={message} />
      }
    />
  );
};

export default CreateThreadSheet;
