import { cn } from "@/lib/utils";
import { FC } from "react";

export interface SidebarProps extends React.ComponentProps<"div"> {}

const Sidebar: FC<SidebarProps> = ({ className, children }) => {
  return (
    <aside
      className={cn(
        "absolute inset-y-0 z-30 hidden h-full max-h-screen flex-col gap-y-3 border-r bg-card py-4 duration-300 ease-in-out lg:flex lg:w-[300px]",
        className,
      )}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
