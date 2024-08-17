import { FC, Suspense } from "react";
import UserInfoClient from "./UserInfo.client";
import { Skeleton } from "@/components/ui/skeleton";

interface UserInfoProps {
  className?: string;
}

const UserInfo: FC<UserInfoProps> = async ({ className }) => {
  return (
    <Suspense
      fallback={
        <div className="px-4">
          <Skeleton className="h-7 w-full" />
        </div>
      }
    >
      <UserInfoClient className={className} />
    </Suspense>
  );
};

export default UserInfo;
