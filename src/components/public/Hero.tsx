import { chatUrl } from "@/app-config";
import { BorderBeam } from "@/components/public/common/BorderBeam";
import Section from "@/components/public/common/Section";
import ThemeImage from "@/components/public/ThemeImage";
import { buttonVariants } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Hero = () => {
  const t = useTranslations("public.Hero");
  return (
    <Section className="mt-10">
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
      <div className="relative mt-12">
        <div className="rounded-2xl border bg-background before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:bg-gradient-to-b before:from-cyan-500 before:opacity-5 before:[filter:blur(180px)] sm:mt-20">
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

{
  /* <div className="card-wrapper z-0 mx-auto mb-4 max-w-fit rounded-full p-[2px] shadow-md ring-1 ring-inset ring-border">
          <div className="flex items-center justify-center space-x-2 overflow-hidden rounded-full bg-card px-6 py-2 backdrop-blur transition-all">
            <p className="text-sm font-semibold text-card-foreground">
              {t("noti")}
            </p>
          </div>
        </div> */
}
