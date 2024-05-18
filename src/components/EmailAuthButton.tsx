"use client";

import { signInWithCredentials } from "@/auth/helpers";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Button } from "./ui/button";

interface EmailAuthButtonProps {
  className?: string;
}

const EmailAuthButton: FC<EmailAuthButtonProps> = ({ className }) => {
  return (
    <Button
      type="submit"
      className={cn("flex w-full items-center gap-x-2", className)}
      onClick={async () => await signInWithCredentials()}
    >
      Đăng nhập
    </Button>
  );
};

export default EmailAuthButton;
