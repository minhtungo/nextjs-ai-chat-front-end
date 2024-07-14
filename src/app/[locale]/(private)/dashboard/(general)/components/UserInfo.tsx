import { FC, Suspense } from "react";
import UserInfoClient from "./UserInfo.client";

interface UserInfoProps {
  className?: string;
}

const UserInfo: FC<UserInfoProps> = async ({ className }) => {
  return (
    <Suspense>
      <UserInfoClient className={className} />
    </Suspense>
  );
};

export default UserInfo;
