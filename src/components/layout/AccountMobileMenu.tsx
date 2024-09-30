import AccountSidebarLinks from "@/components/account/AccountSidebarLinks";
import SheetWrapper from "@/components/common/SheetWrapper";
import SignOutButton from "@/components/common/SignOutButton";

const AccountMobileMenu = () => {
  return (
    <SheetWrapper footer={<SignOutButton />}>
      <AccountSidebarLinks />
    </SheetWrapper>
  );
};

export default AccountMobileMenu;
