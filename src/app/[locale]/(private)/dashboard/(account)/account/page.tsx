import { getCurrentUser } from "@/lib/auth";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Metadata } from "next";
import GeneralSettings from "@/components/private/account/GeneralSettings";
import UserProfileForm from "@/components/private/account/UserProfileForm.server";

export const metadata: Metadata = {
  title: "Account",
};

const AccountPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return (
    <>
      <UserProfileForm currentUser={currentUser} />
      <Separator className="my-6" />
      <GeneralSettings user={currentUser} />
    </>
  );
};

export default AccountPage;
