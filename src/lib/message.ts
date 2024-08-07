import { MessageFile } from "@/types/chat";

export const transformFilesArray = (files: MessageFile[]) => {
  return files.map((file) => ({
    url: file.url,
    name: file.name,
    type: file.type,
  }));
};
