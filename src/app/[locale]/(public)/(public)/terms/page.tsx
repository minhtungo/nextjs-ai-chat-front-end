import Page from "@/components/layout/Page";
import PageHeader from "@/components/layout/PageHeader";
import PageTitle from "@/components/layout/PageTitle";
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
    <Page>
      <PageHeader>
        <PageTitle
          title="Terms of Service"
          description="Last updated August 18th, 2024"
        />
      </PageHeader>
      <TermsOfServices />
    </Page>
  );
};

export default TermsPage;
