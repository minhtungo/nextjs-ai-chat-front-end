import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className }: SectionProps) => {
  return <div className={cn("py-12 sm:py-16", className)}>{children}</div>;
};

export default Section;
