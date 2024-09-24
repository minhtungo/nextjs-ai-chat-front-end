"use client";

import { Button } from "@/components/ui/button";
import { Bot, Copy, Redo, ThumbsDown, ThumbsUp } from "lucide-react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import TooltipContainer from "@/components/common/TooltipContainer";
import { MemoizedReactMarkdown } from "@/components/markdown";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface BotMessageProps {
  content: string;
}

const BotMessage = ({ content }: BotMessageProps) => {
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

        <div className="flex items-center gap-[2px] text-muted-foreground">
          <TooltipContainer content="Copy">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => {
                navigator.clipboard.writeText(content);
                toast.success("Copied to clipboard");
              }}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </TooltipContainer>
          <TooltipContainer content="Good">
            <Button variant="ghost" size="xs">
              <ThumbsUp className="h-3.5 w-3.5" />
            </Button>
          </TooltipContainer>
          <TooltipContainer content="Bad">
            <Button variant="ghost" size="xs">
              <ThumbsDown className="h-3.5 w-3.5" />
            </Button>
          </TooltipContainer>
          <TooltipContainer content="Redo">
            <Button variant="ghost" size="xs">
              <Redo className="h-3.5 w-3.5" />
            </Button>
          </TooltipContainer>
        </div>
      </div>
    </div>
  );
};

export default BotMessage;
