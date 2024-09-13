import { signInUrl, signUpUrl } from "@/app-config";
import Logo from "@/components/common/Logo";
import ChatMobileMenu from "@/components/private/common/ChatMobileMenu";
import NewChatButton from "@/components/private/common/NewChatButton";
import SidebarToggle from "@/components/private/common/SidebarToggle";
import FeedbackDropdown from "@/components/private/feedback/FeedbackDropdown";
import { buttonVariants } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { cn, isGuestUser } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

interface ChatHeaderProps {
  userId: string;
  chatId?: string;
  chatTitle?: string;
  className?: string;
}

const ChatHeader: FC<ChatHeaderProps> = async ({
  userId,
  chatTitle,
  className,
}) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex w-full items-center gap-3 px-4 py-4 lg:px-6",
        className,
      )}
    >
      <SidebarToggle side="left" type="out" />
      {!isGuestUser(userId) ? (
        <>
          <Typography
            className={cn(
              "hidden overflow-hidden text-ellipsis font-normal capitalize lg:block",
              className,
            )}
          >
            {chatTitle ?? "Welcome to Lumi"}
          </Typography>
          <ChatMobileMenu userId={userId} />
        </>
      ) : (
        <Link href="/">
          <Logo />
        </Link>
      )}

      <div className="ml-auto flex items-center justify-end gap-x-2">
        <FeedbackDropdown />
        <SidebarToggle side="right" type="out" />
        {isGuestUser(userId) && (
          <div className="flex items-center gap-x-2">
            <Link
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: "outline",
                }),
              )}
              href={signUpUrl}
            >
              Sign up
            </Link>
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
          </div>
        )}
        {/* {user?.plan === "free" ? <UpgradeButton /> : null} */}
        {!isGuestUser(userId) && <NewChatButton className="ml-1 lg:hidden" />}
      </div>
    </header>
  );
};

export default ChatHeader;
