import ChatDropdownMenu from "@/features/chat/components/ChatDropdownMenu";
import ChatList from "@/features/chat/components/ChatList";
import UpgradePrompt from "@/features/chat/components/UpgradePrompt";
import SignInPrompt from "@/components/common/SignInPrompt";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/lib/auth";

const ChatSidebarContent = async () => {
  const user = await getCurrentUser();

  console.log("user", user);
  return (
    <>
      <ScrollArea className="h-full flex-1">{user && <ChatList />}</ScrollArea>

      {user && user.plan === "free" && (
        <div className="px-4">
          <UpgradePrompt />
        </div>
      )}

      <div className="w-full px-4 pb-4">
        {user ? <ChatDropdownMenu user={user} /> : <SignInPrompt />}
      </div>
    </>
  );
};

export default ChatSidebarContent;
