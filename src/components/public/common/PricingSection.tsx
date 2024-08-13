import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { PRICING_PLANS, PricingPlan } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { signUpHref } from "@/lib/routes";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const PricingSection = () => {
  const t = useTranslations("public.Pricing");
  return (
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
          <Card key={`${title}-plan`} className="flex-1">
            <CardHeader className="gap-y-2">
              <p className="text-lg font-semibold">{t(title as any)}</p>

              <p className="flex items-center gap-1.5">
                <span className="text-3xl font-semibold">${price}</span>
                <span className="text-sm font-semibold text-muted-foreground">
                  / {t(duration as any)}
                </span>
              </p>
              <Typography size="sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col gap-y-2 text-sm">
                {features.map((feature) => (
                  <li
                    key={`${t(feature.title as any)}-feature`}
                    className="bg-success flex items-center gap-x-2"
                  >
                    <CircleCheck className="size-5" />
                    {t(feature.title as any)}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link
                className={cn(
                  buttonVariants({
                    variant: isFeatured ? "default" : "outline",
                  }),
                  "w-full",
                )}
                href={signUpHref}
              >
                {t(cta as any)}
              </Link>
            </CardFooter>
          </Card>
        ),
      )}
    </div>
  );
};

export default PricingSection;
