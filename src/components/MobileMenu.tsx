import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "./ui/button";
import { NAV_LINKS } from "@/lib/constant";
import { signInHref, signUpHref } from "@/routes";

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = () => {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className="">
          <SheetHeader>
            <SheetTitle>Lumi</SheetTitle>
          </SheetHeader>
          <nav>
            <ul className="pb-10 pt-8">
              {NAV_LINKS.map(({ title, href }) => (
                <li
                  key={`${title}-mobile-menu-link`}
                  className="border-t  border-border py-2 font-semibold first:border-none"
                >
                  <Link href={href}>{title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <SheetFooter className="gap-1.5 border-t border-border py-4">
            <SheetClose asChild>
              <Link
                href={signUpHref}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Đăng Ký
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href={signInHref}
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Đăng Nhập
              </Link>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
