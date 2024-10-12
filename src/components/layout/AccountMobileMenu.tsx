import SheetWrapper from "@/components/common/SheetWrapper";
import SignOutButton from "@/components/common/SignOutButton";
import AccountSidebarLinks from "@/features/account/components/AccountSidebarLinks";

const AccountMobileMenu = () => {
  return (
    <SheetWrapper footer={<SignOutButton />}>
      <AccountSidebarLinks />
    </SheetWrapper>
  );
};

export default AccountMobileMenu;
