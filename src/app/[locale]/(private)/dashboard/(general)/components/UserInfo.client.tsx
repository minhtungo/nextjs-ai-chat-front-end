import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface UserInfoProps {
  className?: string;
}

const UserInfo: FC<UserInfoProps> = async ({ className }) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }
  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <Avatar className="size-7">
        <AvatarImage src={user?.image || ""} alt={`${user?.name}-avatar`} />
        <AvatarFallback className="text-[13px]">
          {user?.name ? user.name.split(" ").pop()?.charAt(0) : "G"}
        </AvatarFallback>
      </Avatar>
      <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">
        {user?.name}
      </div>
      <Badge variant="secondary" className="capitalize">
        {user?.plan}
      </Badge>
    </div>
  );
};

export default UserInfo;
