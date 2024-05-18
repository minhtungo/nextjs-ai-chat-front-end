import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { getUserFromDb } from "../lib/db";
import { signInSchema } from "../lib/definitions";
import { ZodError } from "zod";
import type { Provider } from "next-auth/providers";

const providers: Provider[] = [
  Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials): Promise<User | null> {
      try {
        let user = null;

        console.log(credentials);

        const { email, password } = await signInSchema.parseAsync(credentials);

        // logic to salt and hash password
        const pwHash = saltAndHashPassword(password);

        // logic to verify if user exists
        user = await getUserFromDb(email, pwHash);

        if (!user) {
          throw new Error("User not found.");
        }

        // return json object with the user data
        return user;
      } catch (error) {
        console.log("-------", error);
        if (error instanceof ZodError) {
          // Return `null` to indicate that the credentials are invalid
          return null;
        }
        return null;
      }
    },
  }),
  Google,
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    // async signIn({ account, profile }) {
    //   if (account?.provider === "google") {
    //     return profile?.email_verified;
    //   }
    //   return true; // Do different verification for other providers that don't have `email_verified`
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const saltAndHashPassword = (password: string) => {
  return password;
};
