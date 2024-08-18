import PageTitle from "@/components/public/common/PageTitle";
import Section from "@/components/public/home/Section";
import TermsOfServices from "@/components/public/TermsOfServices";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  canonical: "/terms",
});

const TermsPage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return (
    <Section>
      <PageTitle
        title="Terms of Service"
        description="Last updated August 18th, 2024"
      />
      <TermsOfServices />
    </Section>
  );
};

export default TermsPage;
