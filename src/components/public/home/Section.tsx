import { cn } from "@/lib/utils";
import { FC } from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: FC<SectionProps> = ({ children, className }) => {
  return <div className={cn("py-12 sm:py-16", className)}>{children}</div>;
};

export default Section;
