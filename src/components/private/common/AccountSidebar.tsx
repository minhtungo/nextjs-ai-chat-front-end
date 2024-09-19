import AccountSidebarLinks from "@/components/private/account/AccountSidebarLinks";
import UserInfo from "@/components/private/account/UserInfo";
import GoBackButton from "@/components/private/common/GoBackButton";
import Sidebar from "@/components/private/common/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const AccountSidebar = () => {
  return (
    <Sidebar side="default">
      <UserInfo className="mb-3 px-4 pt-4" />
      <ScrollArea className="h-full flex-1">
        <AccountSidebarLinks className="px-4" />
      </ScrollArea>
      <div className="w-full px-4 py-2">
        <GoBackButton />
      </div>
    </Sidebar>
  );
};

export default AccountSidebar;
