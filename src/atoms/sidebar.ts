import { atomWithStorage } from "jotai/utils";

export const chatSidebarAtom = atomWithStorage("chatSidebar", false);
export const attachmentsSidebarAtom = atomWithStorage(
  "attachmentsSidebar",
  false,
);
