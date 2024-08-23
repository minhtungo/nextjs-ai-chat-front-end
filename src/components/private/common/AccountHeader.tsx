import AccountHeaderTitle from "@/components/private/common/AccountHeaderTitle";
import AccountMobileMenu from "@/components/private/common/AccountMobileMenu";

const AccountHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b px-4 lg:px-6">
      <AccountHeaderTitle />
      <div className="ml-auto flex items-center justify-end gap-x-2">
        <AccountMobileMenu />
      </div>
    </header>
  );
};

export default AccountHeader;
