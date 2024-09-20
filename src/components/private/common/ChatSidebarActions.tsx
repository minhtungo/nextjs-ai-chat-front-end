"use client";

import ChatSearch from "@/components/private/common/ChatSearch";
import SidebarToggle from "@/components/private/common/SidebarToggle";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const ChatSidebarActions = () => {
  const { isSidebarOpen } = useSidebar("left");
  const { chatSearchMode, setChatSearchMode } = useChat();

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-x-3 px-3",
        !isSidebarOpen && "w-[70px] justify-center",
      )}
    >
      {chatSearchMode ? (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setChatSearchMode(false)}
        >
          <ArrowLeft className="size-5 text-muted-foreground" />
        </Button>
      ) : (
        <SidebarToggle side="left" />
      )}
      {isSidebarOpen && <ChatSearch />}
    </div>
  );
};

export default ChatSidebarActions;
