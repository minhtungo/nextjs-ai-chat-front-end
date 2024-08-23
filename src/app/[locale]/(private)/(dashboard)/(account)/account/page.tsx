import Google from "@/components/icons/Google";
import ChangePassword from "@/components/private/account/ChangePassword";
import GeneralSettings from "@/components/private/account/GeneralSettings";
import UserProfileFormServer from "@/components/private/account/UserProfileForm.server";
import AccountPageSkeleton from "@/components/private/skeleton/AccountPageSkeleton";
import Typography from "@/components/ui/typography";
import { getCurrentUser } from "@/lib/auth";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = constructMetadata({
  title: "Account",
  canonical: "/account",
});

const AccountPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="grid gap-6">
      <Suspense fallback={<AccountPageSkeleton />}>
        <UserProfileFormServer user={user} />
      </Suspense>
      <GeneralSettings user={user} />

      {!user.isOauth ? (
        <>
          <ChangePassword />
        </>
      ) : (
        <div>
          <Typography variant="h5" tag="h3">
            Connected accounts
          </Typography>
          <p className="mt-1 text-sm text-muted-foreground">
            Below are the accounts linked to your profile
          </p>
          <div className="mt-3 flex items-center gap-x-2">
            <Google className="size-5" />
            <Typography className="text-muted-foreground">Google</Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
