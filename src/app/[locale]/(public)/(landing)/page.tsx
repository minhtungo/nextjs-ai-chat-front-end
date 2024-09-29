import Features from "@/components/providers/Features";

import Page from "@/components/layout/Page";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Hero from "@/app/[locale]/(public)/(landing)/components/Hero";
import Intros from "@/app/[locale]/(public)/(landing)/components/Intros";
import CTA from "@/app/[locale]/(public)/(landing)/components/Cta";
import FAQs from "@/app/[locale]/(public)/(landing)/components/FAQs";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "pages.Home" });

  return {
    title: t("title"),
  };
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <Page className="pt-0">
      <Hero />
      <Features />
      <Intros />
      <CTA />
      <FAQs />
    </Page>
  );
}
