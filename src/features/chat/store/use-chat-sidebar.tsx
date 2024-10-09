import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const chatSidebarAtom = atomWithStorage("chatSidebar", false);

export const useChatSidebar = () => {
  return useAtom(chatSidebarAtom);
};
