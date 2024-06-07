"use client";

import { FC } from "react";

import { Redo, ThumbsDown, ThumbsUp } from "lucide-react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "../ui/card";
import { StreamableValue } from "ai/rsc";
import { useStreamableText } from "@/hooks/use-streamable-text";
import { MemoizedReactMarkdown } from "../markdown";

interface BotMessageProps {
  content: string | StreamableValue<string>;
}

const BotMessage: FC<BotMessageProps> = ({ content }) => {
  const text = useStreamableText(content);

  return (
    <div className="space-y-1.5">
      <Card className="bg-primary-muted w-fit p-3 sm:p-4">
        <MemoizedReactMarkdown
          className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 break-words"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="last:mb-0">{children}</p>;
            },
          }}
        >
          {text}
        </MemoizedReactMarkdown>
      </Card>
      <TooltipProvider delayDuration={100}>
        <div className="flex items-center gap-[2px] text-muted-foreground">
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
  );
};

export default BotMessage;
