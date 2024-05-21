import { User } from "next-auth";
import { FC } from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";

interface UserProfileProps {
  user?: User;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{user?.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default UserProfile;
