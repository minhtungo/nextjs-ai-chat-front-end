import { chatUrl, signInUrl } from "@/app-config";
import Logo from "@/components/common/Logo";
import ChatViewToggle from "@/components/private/chat/ChatViewToggle";
import ChatHeaderTitle from "@/components/private/common/ChatHeaderTitle";
import ChatMobileMenu from "@/components/private/common/ChatMobileMenu";
import UpgradeButton from "@/components/private/common/UpgradeButton";
import FeedbackDropdown from "@/components/private/feedback/FeedbackDropdown";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { FC } from "react";

interface ChatHeaderProps {
  user: User | undefined;
}

const ChatHeader: FC<ChatHeaderProps> = async ({ user }) => {
  return (
    <div className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b px-4 lg:px-6">
      {user ? (
        <>
          <ChatHeaderTitle className="hidden lg:block" />
          <ChatMobileMenu />
        </>
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
        {user?.plan === "free" ? <UpgradeButton /> : null}
        <ChatViewToggle />
        <Link href={chatUrl} className="ml-1 lg:hidden">
          <SquarePen className="size-5 text-muted-foreground hover:text-foreground" />
        </Link>
      </div>
    </div>
  );
};

export default ChatHeader;
