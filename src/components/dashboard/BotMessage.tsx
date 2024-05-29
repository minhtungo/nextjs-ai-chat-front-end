import { FC } from "react";

import { Redo, ThumbsDown, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "../ui/card";

interface BotMessageProps {
  children: React.ReactNode;
}

const BotMessage: FC<BotMessageProps> = ({ children }) => {
  return (
    <div className="space-y-1.5">
      <Card className="bg-primary-muted w-fit p-3 sm:p-4">{children}</Card>
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
