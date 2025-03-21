import { Pathnames } from "next-intl/navigation";

export const locales = ["vi", "en"];

export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    vi: "/pathnames",
  },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
