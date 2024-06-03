import { getChats } from "@/actions/chat";
import { FC, cache } from "react";
import SidebarItems from "./SidebarItems";

interface SidebarListProps {
  userId?: string;
}

const loadChats = cache(async (userId?: string) => {
  return await getChats(userId);
});

const SidebarList: FC<SidebarListProps> = async ({ userId }) => {
  const chats = await loadChats(userId);

  console.log("asd", chats);

  return (
    <>
      {chats.length > 0 && (
        <div className="h-full flex-1 space-y-2.5">
          <SidebarItems chats={chats} />
        </div>
      )}
    </>
  );
};

export default SidebarList;
