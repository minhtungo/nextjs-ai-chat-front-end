import UpdateUserInfoForm from "./UpdateUserInfoForm";
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

  return <UpdateUserInfoForm user={user} />;
};

export default SettingsPage;
