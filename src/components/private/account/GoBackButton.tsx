import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PROTECTED_BASE_URL } from "@/lib/routes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface GoBackButtonProps {
  className?: string;
}

const GoBackButton: FC<GoBackButtonProps> = ({ className }) => {
  return (
    <Link
      className={cn(
        buttonVariants({
          variant: "ghost",
        }),
        "px-3",
        className,
      )}
      href={PROTECTED_BASE_URL}
    >
      <ChevronLeft className="size-4" /> Go Back
    </Link>
  );
};

export default GoBackButton;
