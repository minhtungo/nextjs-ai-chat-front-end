import PageTitle from "@/components/public/common/PageTitle";
import Section from "@/components/public/home/Section";
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
    <Section>
      <PageTitle
        title="Privacy Policy"
        description="Last updated August 18th, 2024"
      />
      <PrivacyPolicy />
    </Section>
  );
};

export default PrivacyPage;
