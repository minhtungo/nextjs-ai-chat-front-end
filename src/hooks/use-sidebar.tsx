"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CHAT_SIDEBAR_KEY = "chat-sidebar";
const ATTACHMENTS_SIDEBAR_KEY = "attachments-sidebar";

interface SidebarContext {
  isChatSidebarOpen: boolean;
  toggleChatSidebar: () => void;
  isAttachmentsSidebarOpen: boolean;
  toggleAttachmentsSidebar: () => void;
  isLoading: boolean;
}

const SidebarContext = createContext<SidebarContext | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProviderProps {
  children: React.ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isChatSidebarOpen, setChatSidebarOpen] = useState(true);
  const [isAttachmentsSidebarOpen, setAttachmentsSidebarOpen] = useState(true);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const chatValue = localStorage.getItem(CHAT_SIDEBAR_KEY);
    const attachmentsValue = localStorage.getItem(ATTACHMENTS_SIDEBAR_KEY);

    if (chatValue) {
      setChatSidebarOpen(JSON.parse(chatValue));
    }

    if (attachmentsValue) {
      setAttachmentsSidebarOpen(JSON.parse(attachmentsValue));
    }

    setLoading(false);
  }, []);

  const toggleChatSidebar = () => {
    setChatSidebarOpen((value) => {
      const newState = !value;
      localStorage.setItem(CHAT_SIDEBAR_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const toggleAttachmentsSidebar = () => {
    setAttachmentsSidebarOpen((value) => {
      const newState = !value;
      localStorage.setItem(ATTACHMENTS_SIDEBAR_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  if (isLoading) {
    return null;
  }

  return (
    <SidebarContext.Provider
      value={{
        isChatSidebarOpen,
        toggleChatSidebar,
        isAttachmentsSidebarOpen,
        toggleAttachmentsSidebar,
        isLoading,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
