import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import NavButtons from "@/components/layout/NavButtons";
import PublicMobileMenu from "@/components/layout/PublicMobileMenu";

import { cn } from "@/lib/utils";
import { Suspense } from "react";

interface HeaderButtonsProps extends React.ComponentProps<"div"> {}

const HeaderButtons = ({ className }: HeaderButtonsProps) => {
  return (
    <div className={cn("flex items-center gap-x-4", className)}>
      <LanguageSwitcher showIcon />
      <Suspense>
        <NavButtons />
      </Suspense>
      <PublicMobileMenu />
    </div>
  );
};

export default HeaderButtons;
