import ChatViewToggle from "@/components/private/chat/ChatViewToggle";
import ChatHeaderTitle from "@/components/private/common/ChatHeaderTitle";
import ChatMobileMenu from "@/components/private/common/ChatMobileMenu";
import UpgradeButton from "@/components/private/common/UpgradeButton";
import FeedbackDropdown from "@/components/private/feedback/FeedbackDropdown";
import { getCurrentUser } from "@/lib/auth";

const ChatHeader = async () => {
  const user = await getCurrentUser();

  return (
    <div className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b px-4 lg:px-6">
      <ChatHeaderTitle />
      <div className="flex items-center justify-end gap-x-2">
        <FeedbackDropdown />
        {user?.plan === "free" ? (
          <UpgradeButton className="hidden md:inline-flex" />
        ) : null}
        <ChatViewToggle />
        <ChatMobileMenu />
      </div>
    </div>
  );
};

export default ChatHeader;
