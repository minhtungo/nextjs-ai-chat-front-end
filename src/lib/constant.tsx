import {
  BotMessageSquare,
  DiscIcon,
  Facebook,
  FacebookIcon,
  Home,
  MessageSquareMore,
} from "lucide-react";

export const NAV_LINKS = [
  {
    title: "About.title",
    href: "/about",
  },
  {
    title: "Pricing.title",
    href: "/pricing",
  },
];

export const DASHBOARD_MOBILE_LINKS = [
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
  {
    title: "Feedback",
    href: "/dashboard/feedback",
    icon: <MessageSquareMore className="h-5 w-5" />,
  },
];

export const SETTINGS_LINKS = [
  {
    title: "Profile",
    href: "/dashboard/settings",
  },
  {
    title: "Billing",
    href: "/dashboard/settings/billing",
  },
  {
    title: "Security",
    href: "/dashboard/settings/security",
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
    icon: <FacebookIcon className="h-4 w-4" />,
  },
  {
    title: "Discord",
    href: "#",
    icon: <DiscIcon className="h-4 w-4" />,
  },
];

export const EXPIRY_PERIOD = 1800 * 1000;

export const PRICING_PLANS = [
  {
    title: "plan.free.title",
    cta: "plan.free.cta",
    price: 0,
    duration: "plan.free.duration",
    features: [
      {
        title: "plan.free.features.1.title",
      },
      {
        title: "plan.free.features.2.title",
      },
      {
        title: "plan.free.features.3.title",
      },
    ],
  },
  {
    title: "plan.pro.title",
    cta: "plan.pro.cta",
    price: 10,
    duration: "plan.free.duration",
    features: [
      {
        title: "plan.pro.features.1.title",
      },
      {
        title: "plan.pro.features.2.title",
      },
      {
        title: "plan.pro.features.3.title",
      },
    ],
  },
  {
    title: "plan.premium.title",
    cta: "plan.premium.cta",
    price: 100,
    duration: "plan.free.duration",
    features: [
      {
        title: "plan.premium.features.1.title",
      },
      {
        title: "plan.premium.features.2.title",
      },
      {
        title: "plan.premium.features.3.title",
      },
    ],
  },
];
