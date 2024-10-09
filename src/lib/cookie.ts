import { cookie } from "@/config/config";
import { cookies } from "next/headers";

export function setChatTokenCookie(token: string, expiresAt: number): void {
  cookies().set(cookie.chat.token, token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  });
}

export function deleteChatTokenCookie(): void {
  cookies().set(cookie.chat.token, "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  });
}
