import { accountUrl } from "@/config/config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

interface UpgradeButtonProps {
  className?: string;
}

const UpgradeButton: FC<UpgradeButtonProps> = ({ className }) => {
  return (
    <Link
      className={cn(
        buttonVariants({
          size: "sm",
        }),
        className,
      )}
      href={`${accountUrl}/subscription`}
    >
      Upgrade
    </Link>
  );
};

export default UpgradeButton;
