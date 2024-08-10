"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { chatStore } from "@/store/chat";
import { ChatRoom } from "@/types/chat";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ChatItem from "./ChatItem";

interface SidebarItemProps {
  chats: ChatRoom[];
  subject: string;
}

const ChatGroup: FC<SidebarItemProps> = ({ subject, chats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    getChat: { subject: chatSubject },
  } = chatStore();

  useEffect(() => {
    if (chatSubject === subject) {
      setIsOpen(true);
    }
  }, [chatSubject]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between space-x-3 border-b pb-3 text-muted-foreground",
          isOpen && "text-foreground",
        )}
      >
        <div className="flex items-center gap-x-1.5">
          {isOpen ? (
            <FolderOpen className="size-4" />
          ) : (
            <Folder className="size-4" />
          )}
          <span
            className={cn("whitespace-nowrap text-left text-sm capitalize")}
          >
            {subject}
          </span>
        </div>

        <div className={cn("transition-all", isOpen && "[&>svg]:rotate-90")}>
          <ChevronRight className="size-4 shrink-0 transition-transform duration-200" />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <ol className="space-y-1">
          {chats
            .toSorted((a: any, b: any) => b.last_active - a.last_active)
            .map((chat) => (
              <ChatItem
                key={`${chat.id}-chat-item`}
                chat={chat}
                setIsOpen={setIsOpen}
              />
            ))}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ChatGroup;
