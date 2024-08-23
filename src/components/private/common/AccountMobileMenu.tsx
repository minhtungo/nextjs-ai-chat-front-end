import SheetWrapper from "@/components/common/SheetWrapper";
import ChatList from "@/components/private/chat/ChatList";
import ChatDropdownMenu from "@/components/private/common/ChatDropdownMenu";

const AccountMobileMenu = () => {
  return (
    <SheetWrapper
      side="left"
      className="mt-12 px-2 sm:px-2"
      triggerClassName="lg:hidden"
      content={<ChatList />}
      footer={<ChatDropdownMenu />}
      footerClassName="px-2 mb-2"
    />
  );
};

export default AccountMobileMenu;
