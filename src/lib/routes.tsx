import Facebook from "@/components/icons/Facebook";

import { accountUrl, adminUrl } from "@/app-config";
import Discord from "@/components/icons/Discord";
import Instagram from "@/components/icons/Instagram";
import {
  CreditCard,
  Folder,
  MessageSquareMore,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const HEADER_URLS = [
  {
    title: "About.title",
    href: "/about",
  },
  {
    title: "Pricing.title",
    href: "/pricing",
  },
  {
    title: "ContactUs.title",
    href: "/contact-us",
  },
];

export const FOOTER_URLS = [
  {
    title: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    title: "Terms",
    href: "/terms",
  },
];

export const ACCOUNT_URLS = [
  {
    title: "Account",
    href: `${accountUrl}`,
    icon: <UserRound className="size-[18px]" />,
  },
  {
    title: "Subscription",
    href: `${accountUrl}/subscription`,
    icon: <CreditCard className="size-[18px]" />,
  },

  {
    title: "Files",
    href: `${accountUrl}/files`,
    icon: <Folder className="size-[18px]" />,
  },
  {
    title: "Support",
    href: `${accountUrl}/support`,
    icon: <MessageSquareMore className="size-[18px]" />,
  },
];

export const CHAT_MENU_URLS = [
  {
    title: "Account",
    href: `${accountUrl}`,
    icon: <UserRound className="size-4" />,
  },
  {
    title: "Subscription",
    href: `${accountUrl}/subscription`,
    icon: <CreditCard className="size-4" />,
  },
  {
    title: "Support",
    href: `${accountUrl}/support`,
    icon: <MessageSquareMore className="size-4" />,
  },
];

export const ADMIN_URLS = [
  {
    title: "Overview",
    href: `${adminUrl}`,
  },
  {
    title: "Mail",
    href: `${adminUrl}/mail`,
  },
];

export const SOCIAL_LINKS = [
  {
    title: "Facebook",
    href: "#",
    icon: <Facebook className="size-5" />,
  },
  {
    title: "Instagram",
    href: "#",
    icon: <Instagram className="size-5" />,
  },
  {
    title: "Discord",
    href: "#",
    icon: <Discord className="size-5" />,
  },
];
