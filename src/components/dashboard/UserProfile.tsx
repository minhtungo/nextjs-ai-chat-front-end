import { ExtendedUser } from "@/types/next-auth";
import { FC } from "react";

import { UserSettings } from "@prisma/client";
import UserInfo from "./UserInfo";

interface UserProfileProps {
  user: ExtendedUser & UserSettings;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  if (!user) return <p>Unauthorized</p>;

  return (
    <>
      <UserInfo user={user} />
    </>
  );
};

export default UserProfile;
