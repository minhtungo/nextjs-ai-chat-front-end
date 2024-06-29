import UserProfile from "@/components/dashboard/UserProfile";
import { getCurrentUser } from "@/lib/auth";
import { signInHref } from "@/routes";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(signInHref);
  }

  return <UserProfile user={user} />;
};

export default SettingsPage;
