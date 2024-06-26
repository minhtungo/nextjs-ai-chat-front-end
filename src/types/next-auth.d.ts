import { UserSettings, type UserRole } from "@prisma/client";
import { User, type DefaultSession } from "next-auth";

// export type ExtendedUser = DefaultSession["user"] & {
//   role: UserRole;
//   isTwoFactorEnabled: boolean;
//   isOauth: boolean;
//   preferredLang: $Enums.Languages;
// };

// declare module "next-auth" {
//   /**
//    * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: ExtendedUser;
//   }
// }

declare module "next-auth" {
  interface User {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOauth: boolean;
    preferredLang: $Enums.Languages;
  }

  interface Session {
    user: User & DefaultSession["user"];
    expires: string;
    error: string;
  }
}
