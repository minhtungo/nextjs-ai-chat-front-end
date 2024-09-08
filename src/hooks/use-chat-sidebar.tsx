import { chatSidebarAtom } from "@/atoms/sidebar";
import { useAtom } from "jotai";

export const useChatSidebar = () => {
  return useAtom(chatSidebarAtom);
};
