"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Chat } from "@/types/chat";
import { ChevronsUpDown } from "lucide-react";
import { FC, useState } from "react";
import ChatItem from "./ChatItem";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  chats: Chat[];
  subject: string;
}

const ChatGroup: FC<SidebarItemProps> = ({ subject, chats }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between space-x-3 border-b pb-2 text-muted-foreground",
          isOpen && "text-foreground",
        )}
      >
        <span className={cn("text-sm font-medium capitalize")}>{subject}</span>
        <ChevronsUpDown className="size-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <ol className="space-y-1.5">
          {chats.map((chat) => (
            <ChatItem chat={chat} />
          ))}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ChatGroup;
