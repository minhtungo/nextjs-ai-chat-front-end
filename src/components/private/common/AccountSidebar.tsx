import SidebarNav from "@/components/private/account/SidebarNav";
import UserInfo from "@/components/private/account/UserInfo";
import GoBackButton from "@/components/private/common/GoBackButton";
import Sidebar from "@/components/private/common/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

const AccountSidebar = () => {
  return (
    <Sidebar className="flex-col gap-y-3 lg:flex">
      <UserInfo className="mb-3 px-4 pt-4" />
      <ScrollArea className="h-full flex-1">
        <SidebarNav className="px-4" />
      </ScrollArea>
      <div className="w-full px-4 py-1.5">
        <GoBackButton className="w-full justify-start" />
      </div>
    </Sidebar>
  );
};

export default AccountSidebar;
