import { attachmentsSidebarAtom } from "@/atoms/sidebar";
import { useAtom } from "jotai";

export const useAttachmentsSidebar = () => {
  return useAtom(attachmentsSidebarAtom);
};
