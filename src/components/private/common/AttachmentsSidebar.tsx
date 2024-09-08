"use client";

import AttachFilePreview from "@/components/private/chat/AttachFilePreview";
import Sidebar from "@/components/private/common/Sidebar";
import { useChat } from "@/hooks/use-chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type User } from "next-auth";
import { FC } from "react";

interface AttachmentsSidebarProps {
  user: User | undefined;
}

const AttachmentsSidebar: FC<AttachmentsSidebarProps> = ({ user }) => {
  const { docs, images } = useChat();

  console.log("AttachmentsSidebar docs", docs);

  return (
    <Sidebar
      className="peer/attachments flex-col gap-y-2 py-4 lg:flex lg:w-[250px]"
      type="attachments"
      side="right"
    >
      <ScrollArea className="py-2">
        <div className="mb-2 mt-4 px-4 text-sm font-semibold">
          Attached Files
        </div>
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
    </Sidebar>
  );
};

export default AttachmentsSidebar;
