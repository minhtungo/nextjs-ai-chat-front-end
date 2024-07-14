import PageTitleWrapper from "@/components/PageTitleWrapper";
import Section from "@/components/Section";
import Typography from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import FAQ from "./FAQ";
import PricingSection from "./PricingSection";

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
      <Section>
        <PageTitleWrapper title={t("title")} description={t("subtitle")} />
        <PricingSection />
      </Section>
      <Section className="mx-auto max-w-4xl">
        <Typography variant="h3" tag="h2" className="mb-8">
          Câu hỏi thường gặp
        </Typography>
        <FAQ />
      </Section>
    </>
  );
}
