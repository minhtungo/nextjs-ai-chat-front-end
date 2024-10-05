import { signIn } from "@/auth";
import Facebook from "@/components/icons/Facebook";
import Google from "@/components/icons/Google";
import { Button } from "@/components/ui/button";
import { afterLoginUrl } from "@/config/config";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

interface OAuthButtonsProps {
  hideAlternative?: boolean;
}

const OAuthButtons = ({ hideAlternative }: OAuthButtonsProps) => {
  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect");
  const t = useTranslations("auth.OAuth");

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <GoogleLogin label={t("google")} redirectURL={redirectURL!} />
        <FacebookLogin label={t("facebook")} redirectURL={redirectURL!} />
      </div>
      {!hideAlternative && (
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("alternative")}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

interface AuthButtonProps {
  className?: string;
  label: string;
  redirectURL: string | null;
}

const FacebookLogin = ({ className, label, redirectURL }: AuthButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn("w-full", className)}
      onClick={async () =>
        await signIn("facebook", {
          redirectTo: redirectURL ?? afterLoginUrl,
        })
      }
    >
      <Facebook className="size-4 sm:size-5" /> <span>{label}</span>
    </Button>
  );
};

const GoogleLogin = ({ className, label, redirectURL }: AuthButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn("w-full", className)}
      onClick={async () =>
        await signIn("google", { redirectTo: redirectURL ?? afterLoginUrl })
      }
    >
      <Google className="size-4 sm:size-5" /> <span>{label}</span>
    </Button>
  );
};

export default OAuthButtons;
