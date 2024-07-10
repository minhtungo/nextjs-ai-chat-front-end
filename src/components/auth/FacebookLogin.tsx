"use client";

import { signInWithFacebook, signInWithGoogle } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import Facebook from "../icons/Facebook";
import { Button } from "../ui/button";

interface FacebookLoginProps {
  className?: string;
}

const FacebookLogin: FC<FacebookLoginProps> = ({ className }) => {
  const t = useTranslations("auth.OAuth");

  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect");
  return (
    <Button
      variant="outline"
      className={cn("flex w-full items-center gap-2", className)}
      onClick={async () => await signInWithFacebook(redirectURL)}
    >
      <Facebook className="size-4 sm:size-5" /> <span>Facebook</span>
    </Button>
  );
};

export default FacebookLogin;
