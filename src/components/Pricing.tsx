import { PRICING_PLANS } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";
import PageTitleWrapper from "./PageTitleWrapper";
import { buttonVariants } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Typography from "./ui/typography";

interface PricingProps {}

const Pricing: FC<PricingProps> = () => {
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
              <p className="text-lg font-semibold">{t(plan.title)}</p>

              <p className="flex items-center gap-1.5">
                <span className="text-2xl font-semibold">${plan.price}</span>
                <span className="text-sm font-semibold text-muted-foreground">
                  / {t(plan.duration)}
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
                    key={`${t(feature.title)}-feature`}
                    className="flex items-center gap-x-2"
                  >
                    <Check className="h-4 w-4" />
                    {t(feature.title)}
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
                {t(plan.cta)}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Pricing;
