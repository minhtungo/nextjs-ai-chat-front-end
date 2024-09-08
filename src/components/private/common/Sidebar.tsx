"use client";

import SidebarToggle from "@/components/private/common/SidebarToggle";
import { useAttachmentsSidebar } from "@/hooks/use-attachments-sidebar";
import { useChatSidebar } from "@/hooks/use-chat-sidebar";
import { useMediaQuery } from "@/hooks/use-media.query";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";

const sidebarVariants = cva(
  "absolute inset-y-0 z-30 hidden h-screen overflow-visible bg-card transition duration-300 ease-in-out data-[state=open]:translate-x-0 lg:w-[300px]",
  {
    variants: {
      side: {
        left: "border-r -translate-x-full",
        right: "border-l right-0 translate-x-full",
      },
    },
    defaultVariants: {
      side: "left",
    },
  },
);

export interface SidebarProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof sidebarVariants> {
  type: "chat" | "attachments";
}

const Sidebar: FC<SidebarProps> = ({
  className,
  type,
  side = "left",
  children,
}) => {
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useChatSidebar();
  const [isAttachmentsSidebarOpen, setIsAttachmentsSidebarOpen] =
    useAttachmentsSidebar();

  const isSidebarOpen =
    type === "chat" ? isChatSidebarOpen : isAttachmentsSidebarOpen;

  const setIsSidebarOpen =
    type === "chat" ? setIsChatSidebarOpen : setIsAttachmentsSidebarOpen;

  const isMobile = useMediaQuery("(max-width: 640px)");

  console.log("Sidebar", isSidebarOpen);
  if (isMobile) return null;

  return (
    <div
      data-state={isSidebarOpen ? "open" : "closed"}
      className={cn(sidebarVariants({ side }), className)}
    >
      {children}
      <SidebarToggle
        className={cn(
          "absolute top-1/2",
          side === "left" && (isSidebarOpen ? "-right-3" : "-right-8"),
          side === "right" && (isSidebarOpen ? "-left-3" : "-left-8"),
        )}
        type={type}
        side={side}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
};

export default Sidebar;
