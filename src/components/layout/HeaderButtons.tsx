import PublicMobileMenu from "@/components/layout/PublicMobileMenu";
import LanguageSwitcher from "@/components/public/common/LanguageSwitcher";
import NavButtons from "@/components/public/common/NavButtons";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface HeaderButtonsProps extends React.ComponentProps<"div"> {}

const HeaderButtons = ({ className }: HeaderButtonsProps) => {
  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <LanguageSwitcher className="mr-2" showIcon />
      <Suspense>
        <NavButtons />
      </Suspense>
      <PublicMobileMenu />
    </div>
  );
};

export default HeaderButtons;
