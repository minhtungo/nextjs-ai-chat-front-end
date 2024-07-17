import { put } from "@vercel/blob";
import { toast } from "sonner";

export const uploadFileUseCase = async (file: File): Promise<string> => {
  try {
    const blob = await put(file.type, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Failed to upload file.");
    return "";
  }
};
