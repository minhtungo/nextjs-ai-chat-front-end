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
    <Select
      defaultValue={locale}
      disabled={isPending}
      onValueChange={onSelectChange}
    >
      <SelectTrigger className={cn("w-[65px]", className)}>
        <SelectValue placeholder={t("label")} />
      </SelectTrigger>
      <SelectContent className="min-w-0">
        {locales.map((cur) => (
          <SelectItem key={cur} value={cur}>
            {t("locale", { locale: cur })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
