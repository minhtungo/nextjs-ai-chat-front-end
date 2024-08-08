import GeneralSettings from "@/components/private/account/GeneralSettings";
import UserProfileForm from "@/components/private/account/UserProfileForm.server";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

const AccountPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="space-y-12">
      <UserProfileForm currentUser={currentUser} />
      <GeneralSettings user={currentUser} />
    </div>
  );
};

export default AccountPage;
