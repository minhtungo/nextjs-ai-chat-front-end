import ChatSidebarContent from "@/components/private/common/ChatSidebarContent";
import NewChatButton from "@/components/private/common/NewChatButton";
import SidebarToggle from "@/components/private/common/SidebarToggle";
import SidebarWithToggle from "@/components/private/common/SidebarWithToggle";
import ChatSkeleton from "@/components/private/skeleton/ChatSkeleton";
import { Suspense } from "react";

const ChatSidebar = () => {
  return (
    <SidebarWithToggle side="left" className="peer/chat gap-y-3 pt-4">
      <div className="px-4">
        <SidebarToggle side="left" />
      </div>
      <div className="px-4">
        <NewChatButton />
      </div>
      <Suspense fallback={<ChatSkeleton />}>
        <ChatSidebarContent />
      </Suspense>
    </SidebarWithToggle>
  );
};

export default ChatSidebar;
