import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { FC } from "react";
interface DUserMenuProps {
  className?: string;
}

const DUserMenu: FC<DUserMenuProps> = async ({ className }) => {
  const session = await auth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className)} asChild>
        <Button variant="secondary" size="avatar" className="rounded-full">
          <Avatar className="h-7 w-7">
            <AvatarImage
              src={session?.user?.image || undefined}
              alt={`${session?.user?.name}-avatar`}
            />
            <AvatarFallback className="text-[13px]">
              {session?.user?.name?.split(" ").pop()?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Cài đặt</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DUserMenu;
