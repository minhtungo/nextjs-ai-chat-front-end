"use client";

import Hint from "@/components/common/Hint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/features/chat/store/use-chat";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface ChatSearchProps extends React.ComponentProps<"div"> {}

const ChatSearch = ({ className }: ChatSearchProps) => {
  const { chatSearchMode, setChatSearchMode } = useChat();

  const searchChat = () => {
    setChatSearchMode(!chatSearchMode);
    console.log("search chat");
  };

  return (
    <>
      {chatSearchMode ? (
        <Input
          type="search"
          placeholder="Search"
          className="h-8 w-full border-primary/20 bg-transparent"
        />
      ) : (
        <Hint label="Search chat">
          <Button
            className={cn("hidden lg:flex", className)}
            variant="ghost"
            size="icon"
            onClick={searchChat}
          >
            <Search className="size-5 text-muted-foreground sm:size-6" />
          </Button>
        </Hint>
      )}
    </>
  );
};

export default ChatSearch;
