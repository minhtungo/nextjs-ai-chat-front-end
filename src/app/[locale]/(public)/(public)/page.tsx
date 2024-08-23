import FAQs from "@/components/public/FAQs";
import CTA from "@/components/public/Cta";
import Features from "@/components/providers/Features";
import Hero from "@/components/public/Hero";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Intros from "@/components/public/Intros";

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
    <>
      <Hero />
      <Features />
      <Intros />
      <CTA />
      <FAQs className="mb-10 sm:mb-14" />
    </>
  );
}
