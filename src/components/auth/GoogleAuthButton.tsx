"use client";

import { signInWithGoogle } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Button } from "../ui/button";
import Google from "../icons/Google";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface GoogleAuthButtonProps {
  className?: string;
}

const GoogleAuthButton: FC<GoogleAuthButtonProps> = ({ className }) => {
  const t = useTranslations("auth.OAuth");

  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect");
  return (
    <Button
      variant="outline"
      className={cn("flex w-full items-center gap-2", className)}
      onClick={async () => await signInWithGoogle(redirectURL)}
    >
      <Google className="h-4 w-4" /> {t("title")}
    </Button>
  );
};

export default GoogleAuthButton;
