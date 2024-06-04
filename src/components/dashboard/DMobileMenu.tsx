import { FC } from "react";
import SheetWrapper from "../SheetWrapper";
import ChatHistory from "../chat/ChatHistory";
import UserMenu from "./UserMenu";

interface DMobileMenuProps {}

const DMobileMenu: FC<DMobileMenuProps> = () => {
  return (
    <SheetWrapper
      side="left"
      className="mt-12 px-2 sm:px-2"
      triggerClassName="lg:hidden"
      content={<ChatHistory />}
      footer={<UserMenu className="w-full" />}
      footerClassName="px-2 mb-2"
    />
  );
};

export default DMobileMenu;
