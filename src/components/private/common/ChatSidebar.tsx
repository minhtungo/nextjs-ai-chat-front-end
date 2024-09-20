import ChatSidebarActions from "@/components/private/common/ChatSidebarActions";
import ChatSidebarContent from "@/components/private/common/ChatSidebarContent";
import NewChatButton from "@/components/private/common/NewChatButton";
import SidebarWithToggle from "@/components/private/common/SidebarWithToggle";
import ChatSkeleton from "@/components/private/skeleton/ChatSkeleton";
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
