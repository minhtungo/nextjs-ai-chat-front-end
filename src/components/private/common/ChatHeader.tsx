import { signInUrl } from "@/app-config";
import Logo from "@/components/common/Logo";
import ChatViewToggle from "@/components/private/chat/ChatViewToggle";
import ChatHeaderTitle from "@/components/private/common/ChatHeaderTitle";
import ChatMobileMenu from "@/components/private/common/ChatMobileMenu";
import UpgradeButton from "@/components/private/common/UpgradeButton";
import FeedbackDropdown from "@/components/private/feedback/FeedbackDropdown";
import { buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ChatHeader = async () => {
  const user = await getCurrentUser();

  return (
    <div className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b px-4 lg:px-6">
      {user ? (
        <ChatHeaderTitle />
      ) : (
        <Link href="/">
          <Logo />
        </Link>
      )}
      <div className="flex items-center justify-end gap-x-2">
        <FeedbackDropdown />
        {!user && (
          <Link
            className={cn(
              buttonVariants({
                size: "sm",
              }),
            )}
            href={signInUrl}
          >
            Login
          </Link>
        )}
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
