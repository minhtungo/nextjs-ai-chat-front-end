import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";
import Typography from "../ui/typography";
import { PROTECTED_BASE_URL } from "@/routes";
import Section from "@/components/Section";
import ThemeImage from "@/components/ThemeImage";

interface HeroProps {}

const Hero: FC<HeroProps> = () => {
  const t = useTranslations("public.Hero");
  return (
    <Section>
      <div className="mb-12 flex flex-col items-center justify-center text-center sm:mb-16">
        <div className="card-wrapper z-0 mx-auto mb-4 max-w-fit rounded-full p-[2px] shadow-md ring-1 ring-inset ring-border">
          <div className="flex items-center justify-center space-x-2 overflow-hidden rounded-full bg-card px-6 py-2 backdrop-blur transition-all">
            <p className="text-sm font-semibold text-card-foreground">
              {t("noti")}
            </p>
          </div>
        </div>
        <Typography variant="h1" className="max-w-4xl">
          {t("title")}
        </Typography>
        <p className="mt-5 max-w-prose text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>

        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href={PROTECTED_BASE_URL}
        >
          {t("cta")}
        </Link>
      </div>
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="card-wrapper z-0 rounded-xl p-1 ring-1 ring-inset ring-border lg:rounded-2xl">
                  <div className="card-content z-10 h-full w-full bg-background shadow-2xl lg:rounded-2xl">
                    <ThemeImage
                      srcLight="/images/hero.png"
                      srcDark="/images/hero-dark.png"
                      width={1916}
                      height={922}
                      fetchPriority="high"
                      alt="Product Preview"
                      className="relative rounded-xl shadow-2xl lg:rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
