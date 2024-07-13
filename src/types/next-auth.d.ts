import { UserSettings, type UserRole } from "@prisma/client";
import { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOauth: boolean;
    isOnboarded: boolean;
    preferredLang: $Enums.Languages;
    iat?: number | undefined;
    exp?: number | undefined;
  }

  interface Session {
    user: User & DefaultSession["user"];
    expires: string;
    error: string;
  }
}
