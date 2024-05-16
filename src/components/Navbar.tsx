"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "@/lib/constant";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };
  return (
    <nav
      className={cn(
        "sticky inset-x-0 top-0 z-50 h-14 w-full bg-transparent transition-colors duration-300",
        scrolling &&
          "border-b border-border/40 bg-background/80 shadow-sm backdrop-blur",
      )}
    >
      <MaxWidthWrapper>
        <div className="flex h-14 items-center">
          <Link
            href="/"
            className="z-40 flex text-lg font-semibold text-blue-500"
          >
            <span>Lumi</span>
          </Link>
          <nav className="hidden sm:block">
            <ul className="ml-10 flex gap-x-6">
              {NAV_LINKS.map(({ title, href }) => (
                <li
                  key={`${title}-desktop-menu-link`}
                  className="font-medium  hover:text-primary/80"
                >
                  <Link href={href}>{title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-auto flex items-center">
            <MobileMenu />
            <ThemeToggle className="ml-2 sm:order-1 sm:ml-4" />
            <div className="hidden items-center space-x-4 sm:flex">
              <Link
                href="/sign-up"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Đăng Ký
              </Link>

              <Link
                href="/sign-in"
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Đăng Nhập
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
