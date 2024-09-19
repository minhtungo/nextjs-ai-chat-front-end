"use client";

import ChatSearch from "@/components/private/common/ChatSearch";
import SidebarToggle from "@/components/private/common/SidebarToggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface ChatSidebarActionsProps {}

const ChatSidebarActions = ({}: ChatSidebarActionsProps) => {
  const { isSidebarOpen } = useSidebar("left");
  console.log("isSidebarOpen", isSidebarOpen);
  return (
    <div
      className={cn(
        "flex items-center justify-between px-3",
        !isSidebarOpen && "w-[70px] justify-center",
      )}
    >
      <SidebarToggle side="left" />
      {isSidebarOpen && <ChatSearch />}
    </div>
  );
};

export default ChatSidebarActions;
