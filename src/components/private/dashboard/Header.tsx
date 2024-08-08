import DMobileMenu from "@/components/private/dashboard/DMobileMenu";
import { FC } from "react";
import ChatViewToggle from "../chat/ChatViewToggle";
import HeaderTitle from "./HeaderTitle";
import FeedbackDropdown from "@/components/private/dashboard/FeedbackDropdown";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b px-4 lg:px-6">
      <HeaderTitle />
      <div className="flex items-center justify-end gap-x-1">
        <FeedbackDropdown />
        <ChatViewToggle />
        <DMobileMenu />
      </div>
    </div>
  );
};

export default Header;
