import { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface BackButtonProps {
  className?: string;
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  href: string;
  label: string;
}

const BackButton: FC<BackButtonProps> = ({
  variant = "default",
  className,
  href,
  label,
}) => {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant,
        }),
        className,
        "w-full",
      )}
      href={href}
    >
      {label}
    </Link>
  );
};

export default BackButton;
