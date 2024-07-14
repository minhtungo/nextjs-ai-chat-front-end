import { getChatsAction } from "@/actions/old/chat";
import { FC, cache } from "react";
import SidebarItems from "./SidebarItems";
import { Chat } from "@/types/chat";

interface SidebarListProps {
  userId?: string;
}

const loadChats = cache(async () => {
  const [data] = await getChatsAction();

  return data;
});

const SidebarList: FC<SidebarListProps> = async ({ userId }) => {
  const chats = await loadChats();

  return (
    <>
      {chats && chats.length > 0 ? (
        <div className="h-full flex-1 space-y-2.5">
          <SidebarItems chats={chats as Chat[]} />
        </div>
      ) : (
        <div className="mt-2 text-sm text-muted-foreground">
          You have no chats yet.
        </div>
      )}
    </>
  );
};

export default SidebarList;
