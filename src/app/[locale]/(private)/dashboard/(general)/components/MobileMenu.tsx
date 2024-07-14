import { FC } from "react";

import UserMenu from "@/app/[locale]/(private)/dashboard/components/UserMenu";
import SheetWrapper from "@/components/SheetWrapper";
import ChatHistory from "@/components/chat/ChatHistory";

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
