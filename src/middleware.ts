import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)", "/dashboard/:path*"],
};

const publicRoutes = ["/sign-in", "/sign-up", "/"];

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const reqUrl = new URL(req.url);
  const isPublicRoute = publicRoutes.includes(path);

  if (!req.auth && reqUrl?.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  if (req.auth && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
});
