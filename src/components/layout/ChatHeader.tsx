import ChatMobileMenu from "@/components/layout/ChatMobileMenu";
import SidebarToggle from "@/components/layout/SidebarToggle";
import { buttonVariants } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { signInUrl, signUpUrl } from "@/config/config";
import UpgradeButton from "@/features/chat/components/UpgradeButton";
import FeedbackDropdown from "@/features/feedback/components/FeedbackDropdown";
import { cn, isGuestUser } from "@/lib/utils";
import { User } from "next-auth";
import Link from "next/link";
import { ComponentProps } from "react";

interface ChatHeaderProps extends ComponentProps<"header"> {
  user: User & {
    id: string;
  };
  title?: string;
}

const ChatHeader = ({ user, title, className }: ChatHeaderProps) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex w-full items-center gap-3 px-4 py-4 lg:pl-6 lg:pr-3",
        className,
      )}
    >
      <ChatMobileMenu user={user!} />

      {!isGuestUser(user.id!) && (
        <Typography className="hidden overflow-hidden text-ellipsis font-normal capitalize lg:block">
          {title ?? "Welcome to Lumi"}
        </Typography>
      )}

      <div className="ml-auto flex items-center justify-end gap-x-2">
        <FeedbackDropdown />
        {isGuestUser(user.id!) && (
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
        {user?.plan === "free" && <UpgradeButton />}
        <SidebarToggle side="right" type="out" />
      </div>
    </header>
  );
};

export default ChatHeader;
