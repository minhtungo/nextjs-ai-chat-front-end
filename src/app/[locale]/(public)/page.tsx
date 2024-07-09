import Section from "@/components/Section";
import ThemeImage from "@/components/ThemeImage";
import Hero from "@/components/home/Hero";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import CTA from "./components/Cta";
import Features from "./components/Features";

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
      <CTA />
    </>
  );
}
