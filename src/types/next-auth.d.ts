import { UserSettings, type UserRole } from "@prisma/client";
import { User, type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOauth: boolean;
  preferredLang: $Enums.Languages;
};

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser;
  }
}

// declare module "next-auth" {
//   interface User {
//     id: string;
//     email: string;
//     cognitoGroups: string[];
//     accessToken: string;
//     refreshToken: string;
//     idToken: string;
//     exp: number;
//     role: string;
//   }

//   interface Session {
//     user: User & DefaultSession["user"];
//     expires: string;
//     error: string;
//   }
// }
