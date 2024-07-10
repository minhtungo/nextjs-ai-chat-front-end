import type { NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { getUserByEmail } from "@/data/user";
import { comparePassword } from "@/lib/security";
import { signInSchema } from "../lib/definitions";

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const validatedFields = signInSchema.safeParse(credentials);

      if (validatedFields.success) {
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email, {
          omit: {
            password: false,
          },
        });
        if (!user || !user.password) return;
        const passwordsMatch = await comparePassword(password, user.password);

        if (passwordsMatch) return user;
      }
      return;
    },
  }),
  Google,
  Facebook,
];

export default { providers } satisfies NextAuthConfig;
