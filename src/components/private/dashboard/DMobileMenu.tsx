import { FC } from "react";

import SheetWrapper from "@/components/common/SheetWrapper";
import ChatHistory from "@/components/private/chat/ChatHistory";
import UserMenu from "./UserMenu";

interface DMobileMenuProps {}

const DMobileMenu: FC<DMobileMenuProps> = () => {
  return (
    <SheetWrapper
      side="left"
      className="mt-12 px-2 sm:px-2"
      triggerClassName="lg:hidden"
      content={<ChatHistory />}
      footer={<UserMenu />}
      footerClassName="px-2 mb-2"
    />
  );
};

export default DMobileMenu;
