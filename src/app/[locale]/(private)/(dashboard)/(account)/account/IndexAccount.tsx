import Google from "@/components/icons/Google";
import AccountPageSkeleton from "@/components/skeleton/AccountPageSkeleton";
import Typography from "@/components/ui/typography";
import ChangePassword from "@/features/account/components/ChangePassword";
import GeneralSettings from "@/features/account/components/GeneralSettings";
import UserProfileFormServer from "@/features/account/components/UserProfileForm.server";
import { getCurrentUser } from "@/lib/auth";
import { Suspense } from "react";

interface IndexAccountProps {}

const IndexAccount = async ({}: IndexAccountProps) => {
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
        <ChangePassword />
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

export default IndexAccount;
