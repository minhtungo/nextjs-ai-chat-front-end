import UserAvatar from "@/components/common/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface UserInfoProps extends React.ComponentProps<"div"> {}

const UserInfo = async ({ className }: UserInfoProps) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <UserAvatar user={user} />
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
