import { FC } from "react";

import { User } from "next-auth";
import UserInfo from "./UserInfo";

interface UserProfileProps {
  user?: User;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  if (!user) return <p>Unauthorized</p>;

  return <UserInfo user={user} />;
};

export default UserProfile;
