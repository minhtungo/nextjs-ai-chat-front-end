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
import { cn } from "@/lib/utils";
import { CreditCard, LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import { FC } from "react";
interface UserMenuProps {
  className?: string;
}

const UserMenu: FC<UserMenuProps> = ({ className }) => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className)} asChild>
        <Button
          variant="ghost"
          className="justify-start gap-2 rounded-lg px-3 py-2"
        >
          <Avatar className="h-5 w-5">
            <AvatarImage
              src={user?.image || undefined}
              alt={`${user?.name}-avatar`}
            />
            <AvatarFallback className="text-[13px]">
              {user?.name ? user.name.split(" ").pop()?.charAt(0) : "G"}
            </AvatarFallback>
          </Avatar>
          <span>{user?.name}</span>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div>{user?.name}</div>
          <div className="text-[13px] text-muted-foreground">{user?.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CreditCard className="h-4 w-4" /> Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="h-4 w-4" /> Cài đặt
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
