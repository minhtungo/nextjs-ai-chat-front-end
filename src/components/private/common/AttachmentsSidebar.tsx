"use client";

import AttachFilePreview from "@/components/private/chat/AttachFilePreview";
import SidebarToggle from "@/components/private/common/SidebarToggle";
import SidebarWithToggle from "@/components/private/common/SidebarWithToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/use-chat";
import { type User } from "next-auth";
import { FC } from "react";

interface AttachmentsSidebarProps {
  user: User | undefined;
}

const AttachmentsSidebar: FC<AttachmentsSidebarProps> = ({ user }) => {
  const { docs, images } = useChat();

  return (
    <SidebarWithToggle
      className="peer/attachments gap-y-3 py-4 lg:w-[250px]"
      side="right"
    >
      <div className="flex items-center justify-end px-2">
        <SidebarToggle side="right" />
      </div>
      <ScrollArea>
        <div className="mb-2 px-4 text-sm font-semibold">Attached Files</div>
        {docs.length > 0 ? (
          <>
            <div className="flex w-full flex-col gap-1 px-4">
              {docs.map(({ name, type, url }) => (
                <AttachFilePreview
                  key={`${url}-${name}`}
                  name={name}
                  type={type}
                  url={url}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="px-4 text-sm text-muted-foreground">
            No documents attached
          </p>
        )}
        <div className="mb-2 mt-4 px-4 text-sm font-semibold">
          Attached Images
        </div>
        {images.length > 0 ? (
          <div className="flex w-full flex-col gap-1 px-4">
            {images.map(({ name, type, url }) => (
              <AttachFilePreview
                key={`${url}-${name}`}
                name={name}
                type={type}
                url={url}
              />
            ))}
          </div>
        ) : (
          <p className="px-4 text-sm text-muted-foreground">
            No photos attached
          </p>
        )}
      </ScrollArea>
    </SidebarWithToggle>
  );
};

export default AttachmentsSidebar;
