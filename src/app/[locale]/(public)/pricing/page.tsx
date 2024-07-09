import { PRICING_PLANS, PricingPlan } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Check, CheckCircle, CircleCheck } from "lucide-react";
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
      <Section>
        <PageTitleWrapper title={t("title")} description={t("subtitle")} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PRICING_PLANS.map(
            ({
              title,
              price,
              cta,
              duration,
              features,
              isFeatured,
            }: PricingPlan) => (
              <Card key={`${title}-plan`} className="flex-1" showBorderOnMobile>
                <CardHeader className="gap-y-2" showBorderOnMobile>
                  <p className="text-lg font-semibold">{t(title as any)}</p>

                  <p className="flex items-center gap-1.5">
                    <span className="text-3xl font-semibold">${price}</span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      / {t(duration as any)}
                    </span>
                  </p>
                  <Typography className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Typography>
                </CardHeader>
                <CardContent showBorderOnMobile>
                  <ul className="flex flex-col gap-y-2 text-sm">
                    {features.map((feature) => (
                      <li
                        key={`${t(feature.title as any)}-feature`}
                        className="flex items-center gap-x-2.5"
                      >
                        <CircleCheck className="h-4 w-4" />
                        {t(feature.title as any)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter showBorderOnMobile>
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: isFeatured ? "default" : "outline",
                      }),
                      "w-full",
                    )}
                    href="/auth/sign-in"
                  >
                    {t(cta as any)}
                  </Link>
                </CardFooter>
              </Card>
            ),
          )}
        </div>
      </Section>
      <FAQ />
    </>
  );
}
