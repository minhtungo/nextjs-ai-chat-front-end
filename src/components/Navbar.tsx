'use client';

import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import { NAV_LINKS } from '@/lib/constant';

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  return (
    <nav className={cn('sticky h-14 inset-x-0 top-0 z-50 w-full transition-colors duration-500 border-b border-slate-900/10', scrolling ? 'bg-white/60 backdrop-blur-sm' : 'bg-transparent')}>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center'>
          <Link href='/' className='flex z-40 font-semibold text-lg text-blue-500'>
            <span>Lumi</span>
          </Link>
          <nav className='hidden sm:block'>
            <ul className='flex gap-x-6 ml-10'>
              {NAV_LINKS.map(({ title, href }) => (
                <li key={`${title}-desktop-menu-link`} className='font-medium  hover:text-primary/80'>
                  <Link href={href}>{title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <MobileMenu />
          <div className='hidden items-center space-x-4 sm:flex ml-auto'>
            <Link
              href='/sign-up'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              Đăng Ký
            </Link>

            <Link
              href='/sign-in'
              className={buttonVariants({
                size: 'sm',
              })}
            >
              Đăng Nhập
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
