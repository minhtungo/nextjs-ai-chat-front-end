"use client";

import UserAvatar from "@/components/private/common/UserAvatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { PROTECTED_BASE_URL, USER_DASHBOARD_LINKS } from "@/lib/routes";
import { ChevronRight, LogOut, Rocket, ShieldCheck } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const UserMenu = () => {
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-fit w-full items-center justify-between px-2"
        >
          <div className="flex items-center gap-x-2">
            <UserAvatar user={user} />
            <span className="text-sm font-medium">{user.name}</span>
          </div>
          {/* <Badge variant="secondary" className="capitalize">
            {user.plan}
          </Badge> */}
          <ChevronRight className="size-4" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
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
        <div className="mt-2 flex items-center justify-between px-2 text-sm">
          <span className="font-medium capitalize">{user.plan} Plan</span>
          <Link
            href={PROTECTED_BASE_URL}
            className={buttonVariants({
              variant: "default",
              size: "manual",
              className: "px-2 py-1 text-xs",
            })}
          >
            <Rocket className="size-3" />
            <span>Upgrade</span>
          </Link>
        </div>
        <DropdownMenuSeparator />
        {USER_DASHBOARD_LINKS.map(({ title, href, icon }) => (
          <DropdownMenuItem asChild key={`${title}-user-dashboard-item`}>
            <Link href={href} className="gap-x-1.5">
              {icon}
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

export default UserMenu;
