import authConfig from "@/auth/config";
import { locales } from "@/lib/config";
import NextAuth from "next-auth";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  signInHref,
} from "./routes";

const { auth } = NextAuth(authConfig);

const publicPages = publicRoutes;

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "vi",
  localePrefix: "never",
});

const authMiddleware = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("isLoggedIn");
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return intlMiddleware(req);
  }

  if (!isLoggedIn && !isPublicRoute) {
    let redirectURL = nextUrl.pathname;
    if (nextUrl.search) {
      redirectURL += nextUrl.search;
    }
    const encodedRedirectURL = encodeURIComponent(redirectURL);
    return Response.redirect(
      new URL(`${signInHref}?redirect=${encodedRedirectURL}`, nextUrl),
    );
  }
  if (isLoggedIn) {
    return intlMiddleware(req);
  }
  return;
});

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = new RegExp(
    `^(/(${locales.join("|")})?)?(${publicPages
      .flatMap((p) => (p === "/" ? ["/", ""] : [p]))
      .join("|")})/?$`,
    "i",
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req); // Apply internationalization for public pages
  } else {
    return (authMiddleware as any)(req); // Apply authentication logic for non-public pages
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// import authConfig from "@/auth/config";
// import NextAuth from "next-auth";
// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
//   signInHref,
// } from "./routes";

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const { nextUrl } = req;
//   const isLoggedIn = !!req?.auth?.user;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) {
//     return null;
//   }
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return null;
//   }
//   if (isPublicRoute && isLoggedIn) {
//     return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//   }
//   if (!isLoggedIn && !isPublicRoute) {
//     let redirectURL = nextUrl.pathname;
//     if (nextUrl.search) {
//       redirectURL += nextUrl.search;
//     }
//     const encodedRedirectURL = encodeURIComponent(redirectURL);
//     return Response.redirect(
//       new URL(`${signInHref}?redirect=${encodedRedirectURL}`, nextUrl),
//     );
//   }
//   return null;
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
