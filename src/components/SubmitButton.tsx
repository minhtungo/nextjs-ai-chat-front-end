"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import Spinner from "./Spinner";
import { Button, ButtonProps } from "./ui/button";

interface SubmitButtonProps extends ButtonProps {
  className?: string;
  label: string;
  isLoading?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  className,
  label,
  isLoading,
  ...props
}) => {
  return (
    <Button
      type="submit"
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
