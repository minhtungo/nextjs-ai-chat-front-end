import { getUserById } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import UserProfileForm from "./UserProfileForm.client";

const UserProfileFormServer = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  const user = await getUserById(currentUser.id!, {
    include: {
      settings: true,
    },
  });

  return <UserProfileForm user={user as any} />;
};

export default UserProfileFormServer;
