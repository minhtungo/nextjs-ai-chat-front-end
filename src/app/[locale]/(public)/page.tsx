import Hero from "@/components/home/Hero";
import Section from "@/components/Section";
import SectionTitleWrapper from "@/components/SectionTitleWrapper";
import Typography from "@/components/ui/typography";
import { INTRO_BLOCKS } from "@/lib/constant";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Features from "./components/Features";
import IntroBlock from "./components/IntroBlock";
import FAQ from "./pricing/FAQ";
import PricingSection from "./pricing/PricingSection";

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
      <Section>
        <SectionTitleWrapper
          subtitle="All-in-One Learning Platform"
          title="Everything you need to get better grades"
        />
        <div className="grid gap-y-16 lg:gap-y-28">
          {INTRO_BLOCKS.map((introBlock) => (
            <IntroBlock
              key={introBlock.title}
              title={introBlock.title}
              description={introBlock.description}
              imageSrc={introBlock.imageSrc}
              width={introBlock.width}
              height={introBlock.height}
              isOrderEven={introBlock.isOrderEven}
            />
          ))}
        </div>
      </Section>
      <Section className="mx-auto max-w-5xl">
        <SectionTitleWrapper
          subtitle="Pricing Plans"
          title="We provide affordable pricing and flexible payment options."
        />
        <PricingSection />
      </Section>
      <Section className="mx-auto max-w-5xl">
        <Typography variant="h3" tag="h4" className="mb-8">
          Frequently asked questions
        </Typography>
        <FAQ />
      </Section>
    </>
  );
}
