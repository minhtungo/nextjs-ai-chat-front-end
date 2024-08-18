import Section from "@/components/public/home/Section";
import ThemeImage from "@/components/public/home/ThemeImage";
import { buttonVariants } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { signUpHref } from "@/lib/routes";
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
          className={buttonVariants({
            variant: "default",
          })}
          href={signUpHref}
          data-aos="fade-up"
          data-aos-delay="200"
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

          <div className="b mx-auto mt-12 rounded-2xl bg-muted/50 p-1.5 ring-1 ring-inset ring-border sm:mt-20">
            <ThemeImage
              srcLight="/images/hero.png"
              srcDark="/images/hero-dark.png"
              width={1920}
              height={925}
              fetchPriority="high"
              alt="Product Preview"
              className="rounded-2xl"
            />
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

{
  /* <div className="card-wrapper z-0 mx-auto mb-4 max-w-fit rounded-full p-[2px] shadow-md ring-1 ring-inset ring-border">
          <div className="flex items-center justify-center space-x-2 overflow-hidden rounded-full bg-card px-6 py-2 backdrop-blur transition-all">
            <p className="text-sm font-semibold text-card-foreground">
              {t("noti")}
            </p>
          </div>
        </div> */
}
