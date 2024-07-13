import DMobileMenu from "@/components/dashboard/DMobileMenu";
import FeedbackDropdown from "@/components/dashboard/FeedbackDropdown";
import { FC } from "react";
import HeaderTitle from "./HeaderTitle";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b px-4 lg:px-6">
      <HeaderTitle />
      <div className="ml-auto flex items-center justify-end gap-x-2">
        <FeedbackDropdown />
        <DMobileMenu />
      </div>
    </header>
  );
};

export default Header;
