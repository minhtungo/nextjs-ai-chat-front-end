import GoBackButton from "@/components/common/GoBackButton";
import BaseSidebar from "@/components/layout/BaseSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import AccountSidebarLinks from "@/features/account/components/AccountSidebarLinks";
import UserInfo from "@/features/account/components/UserInfo.client";

const AccountSidebar = () => {
  return (
    <BaseSidebar side="default">
      <UserInfo className="mb-3 px-4 pt-4" />
      <ScrollArea className="h-full flex-1">
        <AccountSidebarLinks className="px-4" />
      </ScrollArea>
      <div className="w-full px-4 py-2">
        <GoBackButton />
      </div>
    </BaseSidebar>
  );
};

export default AccountSidebar;
