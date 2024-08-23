import GeneralSettings from "@/components/private/account/GeneralSettings";
import UserProfileForm from "@/components/private/account/UserProfileForm.server";
import AccountPageSkeleton from "@/components/private/skeleton/AccountPageSkeleton";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = constructMetadata({
  title: "Account",
  canonical: "/account",
});

const AccountPage = async () => {
  return (
    <div className="grid gap-y-12">
      <Suspense fallback={<AccountPageSkeleton />}>
        <UserProfileForm />
      </Suspense>
      <GeneralSettings />
    </div>
  );
};

export default AccountPage;
