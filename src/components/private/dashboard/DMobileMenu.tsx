import { FC } from "react";

import SheetWrapper from "@/components/common/SheetWrapper";
import ChatList from "@/components/private/chat/ChatList";
import UserMenu from "./UserMenu";

const DMobileMenu = () => {
  return (
    <SheetWrapper
      side="left"
      className="mt-12 px-2 sm:px-2"
      triggerClassName="lg:hidden"
      content={<ChatList />}
      footer={<UserMenu />}
      footerClassName="px-2 mb-2"
    />
  );
};

export default DMobileMenu;
