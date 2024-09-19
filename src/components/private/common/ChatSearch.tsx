"use client";

import TooltipContainer from "@/components/common/TooltipContainer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface ChatSearchProps extends React.ComponentProps<"div"> {}

const ChatSearch = ({ className }: ChatSearchProps) => {
  const searchChat = () => {
    console.log("search chat");
  };

  return (
    <div>
      <TooltipContainer content="Search chat">
        <Button
          className={cn("hidden lg:flex", className)}
          variant="ghost"
          size="icon"
          onClick={searchChat}
        >
          <Search className="size-5 text-muted-foreground sm:size-6" />
        </Button>
      </TooltipContainer>
    </div>
  );
};

export default ChatSearch;
