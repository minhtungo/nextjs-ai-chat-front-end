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
import { cn } from "@/lib/utils";
import { CreditCard, LogOut, Settings } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { FC } from "react";
interface DSideMenuSettingsProps {
  className?: string;
}

const DSideMenuSettings: FC<DSideMenuSettingsProps> = ({ className }) => {
  const { data } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className)} asChild>
        <Button
          variant="ghost"
          className="justify-start gap-2 rounded-lg px-3 py-2"
        >
          <Avatar className="h-5 w-5">
            <AvatarImage
              src={data?.user?.image || undefined}
              alt={`${data?.user?.name}-avatar`}
            />
            <AvatarFallback className="text-[13px]">
              {data?.user?.name?.split(" ").pop()?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span>{data?.user?.name}</span>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div>{data?.user?.name}</div>
          <div className="text-[13px] text-muted-foreground">
            {data?.user?.email}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <CreditCard className="h-4 w-4" /> Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="h-4 w-4" /> Cài đặt
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => await signOut()}>
          <LogOut className="h-4 w-4" /> Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DSideMenuSettings;
