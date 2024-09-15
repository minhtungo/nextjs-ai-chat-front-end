import { chatUrl } from "@/app-config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
        "w-full justify-start px-3",
        className,
      )}
      href={chatUrl}
    >
      <ChevronLeft className="size-4" /> Go Back
    </Link>
  );
};

export default GoBackButton;
