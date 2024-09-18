import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const leftSidebarAtom = atomWithStorage("leftSidebar", true);
export const rightSidebarAtom = atomWithStorage("rightSidebar", false);

export const useSidebar = (side: "left" | "right") => {
  const [isSidebarOpen, setSidebarOpen] = useAtom(
    side === "left" ? leftSidebarAtom : rightSidebarAtom,
  );

  return {
    isSidebarOpen,
    setSidebarOpen,
  };
};
