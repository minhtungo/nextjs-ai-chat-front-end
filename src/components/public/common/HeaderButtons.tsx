import LanguageSwitcher from "@/components/public/common/LanguageSwitcher";
import MobileMenu from "@/components/public/common/MobileMenu";
import NavButtons from "@/components/public/common/NavButtons";
import { cn } from "@/lib/utils";
import { FC, Suspense } from "react";

interface HeaderButtonsProps {
  className?: string;
}

const HeaderButtons: FC<HeaderButtonsProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <LanguageSwitcher className="mr-2" showIcon />
      <Suspense>
        <NavButtons />
      </Suspense>
      <MobileMenu />
    </div>
  );
};

export default HeaderButtons;
