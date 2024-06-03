"use client";

import { Chat } from "@/types/chat";
import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarItem from "./SidebarItem";

interface SidebarItemsProps {
  chats?: Chat[];
}

const SidebarItems: FC<SidebarItemsProps> = ({ chats }) => {
  if (!chats?.length) return null;

  return (
    <AnimatePresence>
      {chats.map(
        (chat, index) =>
          chat && (
            <motion.div
              key={chat?.id}
              exit={{
                opacity: 0,
                height: 0,
              }}
            >
              <SidebarItem index={index} chat={chat}>
                <div></div>
              </SidebarItem>
            </motion.div>
          ),
      )}
    </AnimatePresence>
  );
};

export default SidebarItems;
