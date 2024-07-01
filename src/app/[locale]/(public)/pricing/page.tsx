import { PRICING_PLANS } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import FAQ from "./FAQ";
import Section from "@/components/Section";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "pages.Pricing" });

  return {
    title: t("title"),
  };
}

export default function PricingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("public.Pricing");

  return (
    <>
      <PageTitleWrapper title={t("title")} description={t("subtitle")} />
      <div className="flex flex-col flex-wrap items-stretch justify-start gap-6 lg:flex-row">
        {PRICING_PLANS.map((plan) => (
          <Card
            key={`${plan.title}-plan`}
            className="flex-1"
            showBorderOnMobile
          >
            <CardHeader showBorderOnMobile>
              <p className="text-lg font-semibold">{t(plan.title as any)}</p>

              <p className="flex items-center gap-1.5">
                <span className="text-2xl font-semibold">${plan.price}</span>
                <span className="text-sm font-semibold text-muted-foreground">
                  / {t(plan.duration as any)}
                </span>
              </p>
              <Typography className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
            </CardHeader>
            <CardContent className="border-t" showBorderOnMobile>
              <ul className="mt-4 flex flex-col gap-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li
                    key={`${t(feature.title as any)}-feature`}
                    className="flex items-center gap-x-2"
                  >
                    <Check className="h-4 w-4" />
                    {t(feature.title as any)}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter showBorderOnMobile>
              <Link
                className={cn(
                  buttonVariants({
                    variant: "default",
                  }),
                  "w-full",
                )}
                href="/auth/sign-in"
              >
                {t(plan.cta as any)}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Section>
        <Typography variant="h3" tag="h2" className="mb-3">
          Câu hỏi thường gặp
        </Typography>
        <FAQ />
      </Section>
    </>
  );
}
