import { auth } from "@/auth";
import UserProfile from "@/components/dashboard/UserProfile";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = async () => {
  const user = await getCurrentUser();

  return <UserProfile user={user} />;
};

export default ProfilePage;
