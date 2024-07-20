import Hero from "@/components/public/home/Hero";
import Section from "@/components/public/home/Section";
import Typography from "@/components/ui/typography";
import { INTRO_BLOCKS } from "@/lib/constant";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Features from "@/components/public/home/Features";
import IntroBlock from "@/components/public/home/IntroBlock";
import FAQ from "@/components/public/common/FAQ";
import PricingSection from "@/components/public/common/PricingSection";
import SectionTitleWrapper from "@/components/public/common/SectionTitleWrapper";

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
