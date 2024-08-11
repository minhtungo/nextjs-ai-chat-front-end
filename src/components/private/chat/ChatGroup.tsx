"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChatRoom } from "@/types/chat";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { FC, useState } from "react";
import ChatItem from "./ChatItem";
import { useParams } from "next/navigation";

interface SidebarItemProps {
  chats: ChatRoom[];
  subject: string;
}

const ChatGroup: FC<SidebarItemProps> = ({ subject, chats }) => {
  const { id: chatId } = useParams<{ id: string }>();

  const [isOpen, setIsOpen] = useState(
    chats.some((chat) => chat.id === chatId),
  );

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
                chatId={chatId}
                chat={chat}
              />
            ))}
        </ol>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ChatGroup;
