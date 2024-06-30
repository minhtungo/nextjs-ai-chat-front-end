import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { authErrorHref, signInHref } from "@/routes";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Languages, type UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import authConfig from "./config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: signInHref,
    error: authErrorHref,
  },
  secret: process.env.AUTH_SECRET,
  // jwt: {
  //   encode: async ({ secret, token }) => {
  //     if (!secret) {
  //       return "";
  //     }
  //     return jwt.sign({ ...token, userId: token?.sub }, secret as jwt.Secret, {
  //       algorithm: "HS256",
  //     });
  //   },
  //   decode: async ({ secret, token }) => {
  //     if (!secret) {
  //       return null;
  //     }
  //     return jwt.verify(token!, secret as jwt.Secret, {
  //       algorithms: ["HS256"],
  //     }) as jwt.JwtPayload;
  //   },
  // },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
          settings: {
            create: {},
          },
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      if (!existingUser || !existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) {
          return false;
        }

        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub, {
        include: {
          accounts: {
            select: {
              type: true,
            },
          },
        },
      });

      if (!existingUser) return token;

      token.isOauth = existingUser.accounts?.length > 0;
      token.name = existingUser.name;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.preferredLang =
        existingUser.settings?.preferredLang?.toLowerCase() || "vi";
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (token.isTwoFactorEnabled && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (token.preferredLang && session.user) {
        session.user.preferredLang = token.preferredLang as Languages;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.isOauth = token.isOauth as boolean;
        session.user.iat = token.iat;
        session.user.exp = token.exp;
      }
      return session;
    },
  },
  ...authConfig,
});
