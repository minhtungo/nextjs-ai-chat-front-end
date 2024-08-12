"use client";

import { signInWithGoogle } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { FC } from "react";
import Google from "../icons/Google";
import { Button } from "../ui/button";

interface GoogleLoginProps {
  className?: string;
  label: string;
  redirectURL: string | null;
}

const GoogleLogin: FC<GoogleLoginProps> = ({
  className,
  label,
  redirectURL,
}) => {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={cn("w-full", className)}
      onClick={async () => await signInWithGoogle(redirectURL)}
    >
      <Google className="size-4 sm:size-5" /> <span>{label}</span>
    </Button>
  );
};

export default GoogleLogin;
