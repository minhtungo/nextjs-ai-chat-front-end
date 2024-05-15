import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { buttonVariants } from './ui/button';
import { NAV_LINKS } from '@/lib/constant';

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = () => {
  return (
    <div className='sm:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent className=''>
          <SheetHeader>
            <SheetTitle>Lumi</SheetTitle>
          </SheetHeader>
          <nav>
            <ul className='pt-8 pb-10'>
              {NAV_LINKS.map(({ title, href }) => (
                <li key={`${title}-mobile-menu-link`} className='py-2  border-t border-border first:border-none font-semibold'>
                  <Link href={href}>{title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <SheetFooter className='py-4 border-t border-border gap-1.5'>
            <SheetClose asChild>
              <Link
                href='/sign-up'
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}
              >
                Đăng Ký
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href='/sign-in'
                className={buttonVariants({
                  size: 'sm',
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
