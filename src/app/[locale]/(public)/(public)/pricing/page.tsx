import FAQs from "@/components/public/common/FAQs";
import PageTitle from "@/components/public/common/PageTitle";
import PricingSection from "@/components/public/common/PricingSection";
import Section from "@/components/public/home/Section";
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
    <>
      <Section className="mx-auto mb-10 max-w-4xl sm:mb-14">
        <PageTitle title={t("title")} description={t("subtitle")} />
        <PricingSection />
      </Section>
      <FAQs className="mb-10 sm:mb-14" />
    </>
  );
}
