import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const attachmentsSidebarAtom = atomWithStorage("attachmentsSidebar", false);

export const useAttachmentsSidebar = () => {
  return useAtom(attachmentsSidebarAtom);
};
