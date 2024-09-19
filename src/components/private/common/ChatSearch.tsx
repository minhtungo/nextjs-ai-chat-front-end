"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface ChatSearchProps extends React.ComponentProps<"div"> {}

const ChatSearch = ({ className }: ChatSearchProps) => {
  const searchChat = () => {
    console.log("search chat");
  };

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn("hidden lg:flex", className)}
            variant="ghost"
            size="icon"
            onClick={searchChat}
          >
            <Search className="size-5 text-muted-foreground sm:size-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Search Chat</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ChatSearch;
