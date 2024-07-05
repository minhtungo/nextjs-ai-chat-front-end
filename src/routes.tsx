import {
  CreditCard,
  Facebook,
  MessageSquareMore,
  UserRound,
} from "lucide-react";

export const publicRoutes = ["/", "/pricing", "/about", "/test"];

export const apiAuthPrefix = "/api";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export const signInHref = "/auth/sign-in";
export const signUpHref = "/auth/sign-up";
export const forgotPasswordHref = "/auth/forgot-password";
export const authErrorHref = "/auth/error";
export const emailVerificationHref = "/auth/verification";
export const resetPasswordHref = "/auth/reset-password";

export const authRoutes = [
  signInHref,
  signUpHref,
  authErrorHref,
  emailVerificationHref,
  forgotPasswordHref,
  resetPasswordHref,
];

export const PROTECTED_BASE_URL = "/dashboard";

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

export const SETTINGS_LINKS = [
  {
    title: "Profile",
    href: `${PROTECTED_BASE_URL}/settings`,
  },
  {
    title: "Billing",
    href: `${PROTECTED_BASE_URL}/settings/billing`,
  },
  {
    title: "Security",
    href: `${PROTECTED_BASE_URL}/settings/security`,
  },
  {
    title: "Support",
    href: `${PROTECTED_BASE_URL}/settings/support`,
  },
];

export const ADMIN_DASHBOARD_LINKS = [
  {
    title: "Overview",
    href: `${PROTECTED_BASE_URL}/admin`,
  },
  {
    title: "Mail",
    href: `${PROTECTED_BASE_URL}/admin/mail`,
  },
];

export const USER_DASHBOARD_LINKS = [
  {
    title: "Profile",
    href: `${PROTECTED_BASE_URL}/settings`,
    icon: <UserRound className="size-4" />,
  },
  {
    title: "Billing",
    href: `${PROTECTED_BASE_URL}/settings/billing`,
    icon: <CreditCard className="size-4" />,
  },
  {
    title: "Support",
    href: `${PROTECTED_BASE_URL}/settings/support`,
    icon: <MessageSquareMore className="size-4" />,
  },
];

export const SOCIAL_LINKS = [
  {
    title: "Facebook",
    href: "#",
    icon: (
      <Facebook className="size-5 text-muted-foreground hover:text-accent-foreground" />
    ),
  },
];
