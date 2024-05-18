"use client";

import { signInWithGoogle } from "@/auth/helpers";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Button } from "./ui/button";
import Google from "./icons/Google";

interface GoogleAuthButtonProps {
  className?: string;
}

const GoogleAuthButton: FC<GoogleAuthButtonProps> = ({ className }) => {
  return (
    <Button
      type="submit"
      className={cn("w-full", className)}
      onClick={async () => await signInWithGoogle()}
    >
      <Google className="h-4 w-4" /> Đăng nhập với Google
    </Button>
  );
};

export default GoogleAuthButton;
