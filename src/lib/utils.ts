import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { SUBJECTS } from "./constant";
import { toast } from "sonner";

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

export function validateFilesOnUpload(files: File[]) {
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

export function onUploadFiles(files: File[]) {
  const { error } = validateFilesOnUpload(files);
  const maxSize = 2 * 1024 * 1024;

  if (error) {
    toast.error(error);
    return;
  }

  const allowedFileTypes = ["image/*", ".pdf", ".doc"];

  let validFiles = [] as File[];

  files.forEach((file) => {
    if (allowedFileTypes.includes(file.type) && file.size <= maxSize) {
      validFiles.push(file);
    }
  });

  return validFiles;
}
