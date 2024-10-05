"use server";

import { TOKEN_EXPIRATION } from "@/config/config";
import { authenticatedAction } from "@/lib/safe-actions";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "@/config/env";

const CENTRIFUGO_TOKEN_SECRET = env.CENTRIFUGO_TOKEN_SECRET;

const getTokenExpiration = () => {
  return Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION;
};

export const getConnectionTokenAction = authenticatedAction.handler(
  async ({ ctx: { user } }) => {
    if (!CENTRIFUGO_TOKEN_SECRET) {
      throw new Error("CENTRIFUGO_TOKEN_SECRET is not set");
    }

    const token = {
      sub: user.id,
      exp: getTokenExpiration(),
    };

    const signedToken = jwt.sign(token, CENTRIFUGO_TOKEN_SECRET);

    return { token: signedToken };
  },
);

export const getSubscriptionTokenAction = authenticatedAction
  .input(z.object({ channel: z.string() }))
  .handler(async ({ input: { channel }, ctx: { user } }) => {
    if (!CENTRIFUGO_TOKEN_SECRET) {
      throw new Error("CENTRIFUGO_TOKEN_SECRET is not set");
    }

    const token = {
      sub: user.id,
      channel,
      exp: getTokenExpiration(),
    };

    const signedToken = jwt.sign(token, CENTRIFUGO_TOKEN_SECRET!, {
      algorithm: "HS256",
    });

    return { token: signedToken };
  });

export const getPublishMessageTokenAction = authenticatedAction
  .input(z.object({ channel: z.string(), message: z.string() }))
  .output(z.object({ token: z.string() }))
  .handler(async ({ input: { channel, message }, ctx: { user } }) => {
    if (!CENTRIFUGO_TOKEN_SECRET) {
      throw new Error("CENTRIFUGO_TOKEN_SECRET is not set");
    }

    const token = {
      sub: user.id,
      channel,
      content: message,
      timestamp: Date.now(),
    };

    const signedToken = jwt.sign(token, env.CENTRIFUGO_TOKEN_SECRET!, {
      algorithm: "HS256",
    });

    return { token: signedToken };
  });
