import { put } from "@vercel/blob";
import { toast } from "sonner";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB

export function validateFilesOnUpload(files: any[]) {
  if (files.length === 0) {
    return {
      error: "No files selected",
    };
  }

  let totalSize = 0;

  for (const file of files) {
    totalSize += file.size;
  }

  if (totalSize > MAX_FILE_SIZE) {
    return {
      error: "File size exceeds the maximum allowed size",
    };
  }

  // const allowedFileTypes = ["image/*", ".pdf", ".doc", ".docx"];

  // files.forEach((file) => {
  //   if (!allowedFileTypes.includes(file.type)) {
  //     return {
  //       error: "Invalid file type",
  //     };
  //   }
  // });

  return {
    error: null,
  };
}

export const uploadFile = async (file: File): Promise<string> => {
  try {
    const blob = await put(file.type, file, {
      access: "public",
      token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    });
    return blob.url;
  } catch (error) {
    console.error("Upload error:", error);
    toast.error("Failed to upload file.");
    return "";
  }
};

export const handleUploadedFiles = async (e: any) => {
  const files = e.target.files || e.dataTransfer?.files;
  if (!files || files.length === 0) {
    toast.error("No files selected.");
    return [];
  }

  const fileArray = Array.from(files) as File[];
  const { error } = validateFilesOnUpload(fileArray);

  if (error) {
    toast.error(error);
    return [];
  }

  const uploadPromises = fileArray.map(async (file) => {
    const url = await uploadFile(file);
    if (url) {
      return {
        name: file.name,
        type: file.type.startsWith("image") ? "image" : "document",
        url,
      };
    }
    return null;
  });

  const results = await Promise.all(uploadPromises);
  return results.filter((result) => result !== null);
};

export const handlePastedFiles = async (e: any) => {
  const items = Array.from(e.clipboardData.items || []) as DataTransferItem[];

  if (items.length === 0) {
    return null;
  }

  const lastItem = items[items.length - 1];

  if (lastItem?.kind !== "file" || !lastItem?.getAsFile()) {
    return null;
  }

  const url = await uploadFile(lastItem.getAsFile()!);

  return {
    name: lastItem.getAsFile()?.name || "",
    type: lastItem.getAsFile()?.type.match("^image/") ? "image" : "document",
    url,
  };
};

// export function onUploadFiles(files: File[]) {
//   const { error } = validateFilesOnUpload(files);
//   const maxSize = 2 * 1024 * 1024;

//   if (error) {
//     toast.error(error);
//     return;
//   }

//   const allowedFileTypes = ["image/*", ".pdf", ".doc"];

//   let validFiles = [] as File[];

//   files.forEach((file) => {
//     if (allowedFileTypes.includes(file.type) && file.size <= maxSize) {
//       validFiles.push(file);
//     }
//   });

//   return validFiles;
// }
