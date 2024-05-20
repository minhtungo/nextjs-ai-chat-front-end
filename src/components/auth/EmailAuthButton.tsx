"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import Spinner from "../Spinner";
import { Button } from "../ui/button";

interface EmailAuthButtonProps {
  className?: string;
  label: string;
  isLoading?: boolean;
}

const EmailAuthButton: FC<EmailAuthButtonProps> = ({
  className,
  label,
  isLoading,
}) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cn("flex w-full items-center gap-x-2", className)}
    >
      {label}
      {isLoading && <Spinner />}
    </Button>
  );
};

export default EmailAuthButton;
