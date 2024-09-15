import FAQs from "@/components/public/FAQs";
import PricingSection from "@/components/public/PricingSection";
import Page from "@/components/public/common/Page";
import PageHeader from "@/components/public/common/PageHeader";
import PageTitle from "@/components/public/common/PageTitle";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "pages.Pricing" });

  return {
    title: t("title"),
  };
}

export default function PricingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("public.Pricing");

  return (
    <Page className="max-w-5xl">
      <PageHeader>
        <PageTitle title={t("title")} description={t("subtitle")} />
      </PageHeader>
      <PricingSection />
      <FAQs />
    </Page>
  );
}
