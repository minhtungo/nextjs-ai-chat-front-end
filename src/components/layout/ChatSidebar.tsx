import ChatSidebarContent from "@/components/chat/ChatSidebarContent";
import NewChatButton from "@/components/chat/NewChatButton";
import ChatSidebarActions from "@/components/layout/ChatSidebarActions";
import SidebarWithToggle from "@/components/layout/SidebarWithToggle";
import ChatSkeleton from "@/components/skeleton/ChatSkeleton";
import { Suspense } from "react";

const ChatSidebar = () => {
  return (
    <SidebarWithToggle
      side="left"
      className="peer/chat group/chat gap-y-4 pt-4"
    >
      <ChatSidebarActions />
      <div className="space-y-4 px-4">
        <NewChatButton />
      </div>
      <Suspense fallback={<ChatSkeleton />}>
        <ChatSidebarContent />
      </Suspense>
    </SidebarWithToggle>
  );
};

export default ChatSidebar;
