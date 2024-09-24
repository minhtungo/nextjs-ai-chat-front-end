import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.ComponentProps<"div"> {}

const PageHeader = ({ children, className }: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "mx-auto mb-10 max-w-xl space-y-2 text-pretty text-center",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PageHeader;
