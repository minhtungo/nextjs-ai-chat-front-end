import SheetWrapper from "@/components/common/SheetWrapper";
import ChatList from "@/components/private/chat/ChatList";
import ChatDropdownMenu from "./ChatDropdownMenu";

const ChatMobileMenu = () => {
  return (
    <SheetWrapper
      side="left"
      className="px-0 sm:px-0"
      triggerClassName="lg:hidden"
      content={<ChatList />}
      footer={<ChatDropdownMenu />}
      footerClassName="px-4 mb-2"
    />
  );
};

export default ChatMobileMenu;
