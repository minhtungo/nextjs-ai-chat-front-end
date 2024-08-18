import FAQs from "@/components/public/common/FAQs";
import CTA from "@/components/public/home/Cta";
import Features from "@/components/public/home/Features";
import Hero from "@/components/public/home/Hero";
import Intros from "@/components/public/home/Intros";
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
    <>
      <Hero />
      <Features />
      <Intros />
      <CTA />
      <FAQs className="mb-10 sm:mb-14" />
    </>
  );
}
