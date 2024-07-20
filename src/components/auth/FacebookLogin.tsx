"use client";

import { signInWithFacebook } from "@/actions/auth";
import Facebook from "@/components/icons/Facebook";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface FacebookLoginProps {
  className?: string;
  label: string;
  redirectURL: string | null;
}

const FacebookLogin: FC<FacebookLoginProps> = ({
  className,
  label,
  redirectURL,
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn("w-full", className)}
      onClick={async () => await signInWithFacebook(redirectURL)}
    >
      <Facebook className="size-4 sm:size-5" /> <span>{label}</span>
    </Button>
  );
};

export default FacebookLogin;
