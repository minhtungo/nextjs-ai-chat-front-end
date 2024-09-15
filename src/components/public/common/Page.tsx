import { cn } from "@/lib/utils";
import { FC } from "react";

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

const Page = ({ children, className }: PageProps) => {
  return (
    <div className={cn("relative mx-auto py-12", className)}>{children}</div>
  );
};

export default Page;
