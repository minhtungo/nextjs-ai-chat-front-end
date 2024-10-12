import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
    defaultTranslationValues: {
      p: (chunks) => `<p>${chunks}</p>`,
    },
  };
});

// import { getCurrentUser } from "@/lib/auth";
// import { locales } from "@/lib/config";
// import { getRequestConfig } from "next-intl/server";
// import { notFound } from "next/navigation";

// // Can be imported from a shared config

// export default getRequestConfig(async ({ locale }) => {
//   let mainLocale = locale;
//   // Validate that the incoming `locale` parameter is valid
//   if (!locales.includes(mainLocale as any)) notFound();

//   const user = await getCurrentUser();

//   if (user && user.preferredLang) {
//     mainLocale = user.preferredLang.toLowerCase() || locale;
//   }

//   return {
//     messages: (await import(`../messages/${mainLocale}.json`)).default,
//     defaultTranslationValues: {
//       p: (chunks) => `<p>${chunks}</p>`,
//     },
//   };
// });
