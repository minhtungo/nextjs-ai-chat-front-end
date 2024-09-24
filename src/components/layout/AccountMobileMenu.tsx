"use client";

import Logo from "@/components/common/Logo";
import AccountSidebarLinks from "@/components/account/AccountSidebarLinks";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOut, Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const AccountMobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden">
        <Menu className="size-5 text-muted-foreground hover:text-foreground" />
      </SheetTrigger>
      <SheetContent
        className="flex h-screen flex-col"
        side="left"
        noCloseTrigger
      >
        <div className="flex items-center justify-between px-4 pt-4">
          <SheetClose>
            <Link href="/">
              <Logo />
            </Link>
          </SheetClose>
        </div>
        <ScrollArea className="flex h-full w-full flex-1 flex-col py-2">
          <AccountSidebarLinks className="px-4" />
        </ScrollArea>
        <div className="px-4 pb-4">
          <Button
            onClick={async () =>
              await signOut({
                callbackUrl: "/",
              })
            }
            className="w-full"
          >
            <LogOut className="h-4 w-4" /> Đăng xuất
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccountMobileMenu;
