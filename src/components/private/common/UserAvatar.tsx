import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  user: User;
  className?: string;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, className }) => {
  return (
    <Avatar className={cn("size-6", className)}>
      <AvatarImage src={user.image || ""} alt={`${user.name}-avatar`} />
      <AvatarFallback className="text-[13px]">
        {user.name ? user.name.split(" ").pop()?.charAt(0) : "G"}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
