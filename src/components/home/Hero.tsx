import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
import { useTranslations } from "next-intl";

interface HeroProps {}

const Hero: FC<HeroProps> = () => {
  const t = useTranslations("public.Hero");
  return (
    <div className="mb-12 mt-20 flex flex-col items-center justify-center text-center sm:mt-28">
      <div className="card-wrapper z-0 mx-auto mb-4 max-w-fit rounded-full p-[2px] ring-1 ring-inset ring-border">
        <div className="flex items-center justify-center space-x-2 overflow-hidden bg-card px-6 py-2 shadow-md backdrop-blur transition-all">
          <p className="text-sm font-semibold text-card-foreground">
            {t("noti")}
          </p>
        </div>
      </div>
      <h1 className="max-w-4xl text-4xl font-bold md:text-5xl md:!leading-tight lg:text-6xl">
        {t("title")}
      </h1>
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
