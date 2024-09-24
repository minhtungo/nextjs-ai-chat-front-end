import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import UserInfoClient from "./UserInfo.client";

interface UserInfoProps extends React.ComponentProps<"div"> {}

const UserInfo = async ({ className }: UserInfoProps) => {
  return (
    <Suspense
      fallback={
        <div className="px-4">
          <Skeleton className="h-8 w-full" />
        </div>
      }
    >
      <UserInfoClient className={className} />
    </Suspense>
  );
};

export default UserInfo;
