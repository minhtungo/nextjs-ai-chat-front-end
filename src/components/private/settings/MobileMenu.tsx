import SheetWrapper from "@/components/common/SheetWrapper";
import ChatHistory from "@/components/private/chat/ChatHistory";
import UserMenu from "@/components/private/dashboard/UserMenu";

const MobileMenu = () => {
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

export default MobileMenu;
