"use client";

import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bot, Copy, Redo, ThumbsDown, ThumbsUp } from "lucide-react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { MemoizedReactMarkdown } from "@/components/markdown";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface BotMessageProps {
  content: string;
}

const BotMessage: FC<BotMessageProps> = ({ content }) => {
  // const text = useStreamableText(content);

  return (
    <div className="flex w-full flex-1 gap-3 break-words text-sm leading-7 text-foreground/90">
      <Avatar className="size-8">
        <AvatarFallback>
          <Bot className="size-4" />
        </AvatarFallback>
      </Avatar>
      <div className="space-y-2.5">
        <MemoizedReactMarkdown
          className="break-words"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="last:mb-0">{children}</p>;
            },
          }}
        >
          {content}
        </MemoizedReactMarkdown>
        <TooltipProvider delayDuration={100}>
          <div className="flex items-center gap-[2px] text-muted-foreground">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="xs">
                  <Copy className="h-3.5 w-3.5" />
                  <span className="sr-only">Copy</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Copy</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="xs">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span className="sr-only">Good</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Good</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="xs">
                  <ThumbsDown className="h-3.5 w-3.5" />
                  <span className="sr-only">Bad</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Bad</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="xs">
                  <Redo className="h-3.5 w-3.5" />
                  <span className="sr-only">Redo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Redo</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default BotMessage;
