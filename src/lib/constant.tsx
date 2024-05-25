import {
  BotMessageSquare,
  DiscIcon,
  Facebook,
  FacebookIcon,
  Home,
} from "lucide-react";

export const NAV_LINKS = [
  {
    title: "Về Lumi",
    href: "/about",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
];

export const DASHBOARD_LINKS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Hỏi Lumi",
    href: "/dashboard/chat",
    icon: <BotMessageSquare className="h-5 w-5" />,
  },
];

export const SOCIAL_LINKS = [
  {
    title: "Facebook",
    href: "#",
    icon: <FacebookIcon className="h-5 w-5" />,
  },
  {
    title: "Discord",
    href: "#",
    icon: <DiscIcon className="h-5 w-5" />,
  },
];

export const EXPIRY_PERIOD = 1800 * 1000;
