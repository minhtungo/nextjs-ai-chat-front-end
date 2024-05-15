'use client';

import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';

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
        <div className='flex h-14 items-center justify-between'>
          <Link href='/' className='flex z-40 font-semibold'>
            <span>Lumi</span>
          </Link>
          <MobileMenu />
          <div className='hidden items-center space-x-4 sm:flex'>
            <>
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
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
