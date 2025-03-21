import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_GOOGLE_ID: z.string().min(1),
    AUTH_GOOGLE_SECRET: z.string().min(1),
    AUTH_FACEBOOK_ID: z.string().min(1),
    AUTH_FACEBOOK_SECRET: z.string().min(1),
    AUTH_SECRET: z.string().min(1),
    ASSET_SERVER_URL: z.string().min(1),
    CENTRIFUGO_TOKEN_SECRET: z.string().min(1),
    CENTRIFUGO_API_KEY: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    NODE_ENV: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().min(1),
    NEXT_PUBLIC_CHAT_SERVER_URL: z.string().min(1),
    NEXT_PUBLIC_WS_ENDPOINT: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    ASSET_SERVER_URL: process.env.ASSET_SERVER_URL,
    CENTRIFUGO_TOKEN_SECRET: process.env.CENTRIFUGO_TOKEN_SECRET,
    CENTRIFUGO_API_KEY: process.env.CENTRIFUGO_API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    AUTH_FACEBOOK_ID: process.env.AUTH_FACEBOOK_ID,
    AUTH_FACEBOOK_SECRET: process.env.AUTH_FACEBOOK_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CHAT_SERVER_URL: process.env.NEXT_PUBLIC_CHAT_SERVER_URL,
    NEXT_PUBLIC_WS_ENDPOINT: process.env.NEXT_PUBLIC_WS_ENDPOINT,
  },
});
