import { chatUrl } from "@/config/config";
import ThemeImage from "@/app/[locale]/(public)/(landing)/components/ThemeImage";
import { BorderBeam } from "@/components/common/BorderBeam";
import Section from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Hero = () => {
  const t = useTranslations("public.Hero");
  return (
    <Section>
      <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center text-pretty text-center sm:mb-16">
        <Typography variant="h1">{t("title")}</Typography>
        <p
          className="mb-6 mt-5 w-full max-w-prose text-muted-foreground sm:w-3/4 sm:text-lg"
          data-aos="fade-up"
        >
          {t("subtitle")}
        </p>
        <Link
          className={buttonVariants()}
          href={chatUrl}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {t("cta")}
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <div className="relative mt-12 overflow-hidden">
        <div className="overflow-hidden rounded-2xl border bg-background before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:bg-gradient-to-b before:from-cyan-500 before:opacity-5 before:[filter:blur(180px)]">
          <ThemeImage
            srcLight="/images/hero.png"
            srcDark="/images/hero-dark.png"
            width={1920}
            height={925}
            alt="Chat Preview"
            className="relative rounded-2xl shadow"
          />
          <BorderBeam />
        </div>
      </div>
    </Section>
  );
};

export default Hero;
