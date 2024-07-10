"use client";

import { signInWithGoogle } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Button } from "../ui/button";
import Google from "../icons/Google";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface GoogleLoginProps {
  className?: string;
}

const GoogleLogin: FC<GoogleLoginProps> = ({ className }) => {
  const t = useTranslations("auth.OAuth");

  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect");
  return (
    <Button
      variant="outline"
      className={cn("flex w-full items-center gap-2", className)}
      onClick={async () => await signInWithGoogle(redirectURL)}
    >
      <Google className="size-4 sm:size-5" /> <span>Google</span>
    </Button>
  );
};

export default GoogleLogin;
