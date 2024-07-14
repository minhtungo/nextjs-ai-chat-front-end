"use client";

import Typography from "@/components/ui/typography";
import { usePathname } from "next/navigation";
import React, { FC } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { generateBreadcrumbs } from "@/lib/utils";
import Link from "next/link";

interface HeaderTitleProps {}

const HeaderTitle: FC<HeaderTitleProps> = () => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={`${breadcrumb.title}-breadcrumb-item`}>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage className="scroll-m-20 text-base font-medium sm:text-lg">
                    {breadcrumb.title === "Profile"
                      ? "Settings"
                      : breadcrumb.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href={breadcrumb.href}
                        className="scroll-m-20 text-base font-medium sm:text-lg"
                      >
                        {breadcrumb.title === "Profile"
                          ? "Settings"
                          : breadcrumb.title}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default HeaderTitle;
