import { type ClassValue, clsx } from "clsx";
import { customAlphabet } from "nanoid";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { SUBJECTS } from "./constant";
import { DASHBOARD_LINKS } from "@/routes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  15,
); // 15-character random string

export const formatDate = (date: Date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${month} ${day}, ${year} ${formattedHours}:${minutes}${ampm}`;
};

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);

export const encodeImage = async (file?: File) => {
  if (!file) return null;

  const encoded = await file
    .arrayBuffer()
    .then((buffer) => Buffer.from(buffer).toString("base64"));

  return encoded;
};

export function getSubjectLabelFromValue(value: string): string {
  const subject = SUBJECTS.find((subject) => subject.value === value);
  return subject ? subject.label : value; // Fallback to value if label not found
}

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

export function handleUploadedFiles(e: any) {
  const fileArray = (
    e.target.files
      ? Array.from(e.target?.files)
      : Array.from(e.dataTransfer?.files)
  ) as File[];

  if (!fileArray || fileArray.length === 0) {
    return;
  }

  const { error } = validateFilesOnUpload(fileArray);

  if (error) {
    toast.error(error);
    return [];
  }

  return fileArray.map((file) => {
    return {
      name: file.name,
      type: file.type.startsWith("image") ? "image" : "document",
      file,
    };
  });
}

export function handlePastedFiles(e: any) {
  const items = Array.from(e.clipboardData.items || []) as DataTransferItem[];

  if (items.length === 0) {
    return null;
  }

  const lastItem = items[items.length - 1];

  if (lastItem?.kind !== "file" || !lastItem?.getAsFile()) {
    return null;
  }

  lastItem.kind;

  return {
    name: lastItem.getAsFile()?.name || "",
    type: lastItem.getAsFile()?.type.match("^image/") ? "image" : "document",
    file: lastItem.getAsFile(),
  };
}

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

export const generateBreadcrumbs = (pathname: string) => {
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { title: string; href: string }[] = [];

  let currentPath = "";
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const match = DASHBOARD_LINKS.find((link) => link.href === currentPath);
    if (match) {
      breadcrumbs.push({
        title: match.title,
        href: currentPath,
      });
    }
  });

  return breadcrumbs;
};
