"use client";

import { updatePreferredLang } from "@/actions/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locales } from "@/lib/config";
import { usePathname, useRouter } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { FC, useTransition } from "react";
import ENFlag from "./icons/ENFlag";
import VNFlag from "./icons/VNFlag";
import { Earth, Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({ className }) => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      updatePreferredLang(nextLocale);
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  };

  return (
    <div className="flex items-center gap-x-3">
      <Globe className="size-5 text-muted-foreground" />
      <Select
        defaultValue={locale}
        disabled={isPending}
        onValueChange={onSelectChange}
      >
        <SelectTrigger
          className={cn("h-9 w-fit px-2 text-muted-foreground", className)}
        >
          <SelectValue placeholder={t("label")} />
        </SelectTrigger>
        <SelectContent className="min-w-0">
          {locales.map((cur) => (
            <SelectItem key={cur} value={cur} className="font-normal">
              {t("locale", { locale: cur }) === "VI" ? "Tiếng Việt" : "English"}
              {/* {t("locale", { locale: cur }) === "VI" ? (
                <div className="flex items-center gap-x-2">
                  <span>VI</span>
                  <VNFlag className="size-5" />
                </div>
              ) : (
                <div className="flex items-center gap-x-2">
                  <span>EN</span>
                  <ENFlag className="size-5" />
                </div>
              )} */}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
