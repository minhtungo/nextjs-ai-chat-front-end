type FileType = "image" | "document" | "pdf";

export type FileAtom = {
  id: string;
  name: string;
  type?: FileType;
  url?: string;
  preview?: string;
  thumbnail?: string;
  size?: number;
  isUploading?: boolean;
  originalWidth?: number;
  originalHeight?: number;
};
