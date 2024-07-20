import { type ClassValue, clsx } from "clsx";
import { customAlphabet } from "nanoid";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { SUBJECTS } from "./constant";
import { DASHBOARD_LINKS } from "@/lib/routes";

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
