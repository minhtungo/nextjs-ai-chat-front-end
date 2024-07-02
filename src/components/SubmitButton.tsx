"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import Spinner from "./Spinner";
import { Button, ButtonProps } from "./ui/button";

interface SubmitButtonProps extends ButtonProps {
  className?: string;
  label: string;
  isLoading?: boolean;
  type?: "submit" | "button";
}

const SubmitButton: FC<SubmitButtonProps> = ({
  className,
  label,
  isLoading,
  type = "submit",
  ...props
}) => {
  return (
    <Button
      type={type}
      disabled={isLoading}
      className={cn("flex items-center gap-x-2", className)}
      {...props}
    >
      {label}
      {isLoading && <Spinner />}
    </Button>
  );
};

export default SubmitButton;
