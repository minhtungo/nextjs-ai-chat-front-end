import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";

interface OAuthButtonsProps {
  hideAlternative?: boolean;
}

const OAuthButtons: FC<OAuthButtonsProps> = ({ hideAlternative }) => {
  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect");
  const t = useTranslations("auth.OAuth");

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <GoogleLogin label={t("google")} redirectURL={redirectURL} />
        <FacebookLogin label={t("facebook")} redirectURL={redirectURL} />
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

export default OAuthButtons;
