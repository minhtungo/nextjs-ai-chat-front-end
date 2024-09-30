import IndexAccount from "@/app/[locale]/(private)/(dashboard)/(account)/account/IndexAccount";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = constructMetadata({
  title: "Account",
  canonical: "/account",
});

const AccountPage = async () => {
  return (
    <Suspense>
      <IndexAccount />
    </Suspense>
  );
};

export default AccountPage;
