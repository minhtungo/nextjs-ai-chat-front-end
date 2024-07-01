import ThemeToggle from "@/components/ThemeToggle";
import DMobileMenu from "@/components/dashboard/DMobileMenu";
import FeedbackDropdown from "@/components/dashboard/FeedbackDropdown";
import SidebarToggle from "@/components/dashboard/SidebarToggle";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b px-4 lg:px-6">
      <DMobileMenu />
      <SidebarToggle />
      <div className="flex items-center gap-x-2">
        <FeedbackDropdown />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
