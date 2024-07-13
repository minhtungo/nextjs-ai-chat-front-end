"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";
import { USER_DASHBOARD_LINKS } from "@/routes";
import { LogOut, ShieldCheck } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const UserMenu = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-fit w-full justify-start gap-2">
          <Avatar className="size-7">
            <AvatarImage src={user?.image || ""} alt={`${user?.name}-avatar`} />
            <AvatarFallback className="text-[13px]">
              {user?.name ? user.name.split(" ").pop()?.charAt(0) : "G"}
            </AvatarFallback>
          </Avatar>
          <span className="text-base">{user?.name}</span>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div>{user?.name}</div>
          <div className="text-sm text-muted-foreground">{user?.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {USER_DASHBOARD_LINKS.map(({ title, href, icon }) => (
          <DropdownMenuItem asChild key={`${title}-user-dashboard-item`}>
            <Link href={href} className="gap-x-1.5">
              {icon}
              {title}
            </Link>
          </DropdownMenuItem>
        ))}
        {user?.role === "ADMIN" && (
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
