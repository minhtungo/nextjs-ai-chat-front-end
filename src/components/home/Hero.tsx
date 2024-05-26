import { buttonVariants } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FC } from "react";
import Typography from "../ui/typography";

interface HeroProps {}

const Hero: FC<HeroProps> = () => {
  const t = useTranslations("public.Hero");
  return (
    <div className="mb-12 mt-12 flex flex-col items-center justify-center text-center sm:mt-16">
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
        href="/dashboard/chat"
      >
        {t("cta")}
      </Link>
    </div>
  );
};

export default Hero;
