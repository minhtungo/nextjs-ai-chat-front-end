"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { FC } from "react";
import { Button } from "../ui/button";
import { Sidebar } from "lucide-react";

interface SidebarToggleProps {}

const SidebarToggle: FC<SidebarToggleProps> = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      className="-ml-3 hidden lg:flex"
      onClick={() => {
        toggleSidebar();
      }}
    >
      <Sidebar className="size-5" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

export default SidebarToggle;
