"use client";

import TooltipContainer from "@/components/common/TooltipContainer";
import ThemeSwitch from "@/components/common/ThemeSwitch";
import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/hooks/use-sidebar";
import { CHAT_MENU_URLS } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { EllipsisVertical, LogOut, ShieldCheck } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface ChatDropdownMenuProps {
  user: User | undefined;
}

const ChatDropdownMenu = ({ user }: ChatDropdownMenuProps) => {
  const { isSidebarOpen } = useSidebar("left");

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu modal={false}>
      <TooltipContainer content="User Menu">
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-fit w-full items-center justify-between px-2"
          >
            <div className="flex items-center gap-x-2 text-sm font-medium">
              <UserAvatar user={user} />
              <span
                className={cn(
                  "duration opacity-100 transition-all duration-300 ease-in-out",
                  !isSidebarOpen && "opacity-0 duration-0",
                )}
              >
                {user.name}
              </span>
            </div>
            <EllipsisVertical className="size-4" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
      </TooltipContainer>
      <DropdownMenuContent align="end" className="min-w-72">
        <DropdownMenuLabel>
          <div className="flex items-center gap-x-2">
            <UserAvatar user={user} className="size-8 sm:size-8" />
            <div>
              <div>{user.name}</div>
              <div className="text-sm text-muted-foreground">{user?.email}</div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        {CHAT_MENU_URLS.map(({ title, href, icon: Icon }) => (
          <DropdownMenuItem asChild key={`${title}-user-dashboard-item`}>
            <Link href={href} className="gap-x-1.5">
              <Icon className="size-[18px]" />
              {title}
            </Link>
          </DropdownMenuItem>
        ))}
        {user.role === "ADMIN" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/admin" className="gap-x-1.5">
                <ShieldCheck className="h-4 w-4" /> Admin
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ThemeSwitch />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () =>
            await signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOut className="h-4 w-4" /> Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatDropdownMenu;
