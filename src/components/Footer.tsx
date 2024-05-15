import { FC } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { SOCIAL_LINKS } from '@/lib/constant';
import Link from 'next/link';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer className='py-5 sm:py-8 border-t border-border'>
      <MaxWidthWrapper>
        <div className='flex flex-col justify-center gap-y-3 sm:flex-row sm:items-center sm:justify-between text-center sm:text-left'>
          <p className='text-muted-foreground'>© {new Date().getFullYear()} Lumi</p>
          <ul className='flex gap-5 justify-center sm:justify-end items-center'>
            {SOCIAL_LINKS.map(({ title, href, icon }) => (
              <li key={`social-${title}`}>
                <Link href={href}>{icon}</Link>
              </li>
            ))}
          </ul>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
