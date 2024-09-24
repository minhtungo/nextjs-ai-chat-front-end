import Features from "@/components/providers/Features";
import CTA from "@/components/public/Cta";
import FAQs from "@/components/public/FAQs";
import Hero from "@/components/public/Hero";
import Intros from "@/components/public/Intros";
import Page from "@/components/layout/Page";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

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
