import Page from "@/components/public/common/Page";
import PageHeader from "@/components/public/common/PageHeader";
import PageTitle from "@/components/public/common/PageTitle";
import PrivacyPolicy from "@/components/public/PrivacyPolicy";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  canonical: "/privacy-policy",
});

const PrivacyPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  return (
    <Page>
      <PageHeader>
        <PageTitle
          title="Privacy Policy"
          description="Last updated August 18th, 2024"
        />
      </PageHeader>
      <PrivacyPolicy />
    </Page>
  );
};

export default PrivacyPage;
