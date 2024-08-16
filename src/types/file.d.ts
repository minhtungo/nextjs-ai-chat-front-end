type FileType = "image" | "document" | "pdf";

export type FileAtom = {
  id: string;
  name: string;
  type: FileType;
  url?: string;
  preview?: string;
  thumbnail?: string;
  size: number;
  isUploading?: boolean;
  originalWidth?: number;
  originalHeight?: number;
};

export type MessageFile = {
  id: string;
  name: string;
  type: "image" | "document" | "pdf";
  url?: string;
  preview?: string;
  thumbnail?: string;
  isUploading?: boolean;
  size: number;
  originalWidth?: number;
  originalHeight?: number;
};
