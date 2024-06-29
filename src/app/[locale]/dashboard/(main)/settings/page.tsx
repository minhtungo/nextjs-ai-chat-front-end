import UserProfile from "@/components/dashboard/UserProfile";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = async () => {
  const user = await getCurrentUser();

  return <UserProfile user={user} />;
};

export default SettingsPage;
