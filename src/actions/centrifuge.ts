"use server";

import { authedAction } from "@/lib/safe-actions";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { encodeDataUseCase } from "@/use-cases/centrifuge";

const TOKEN_EXPIRATION_IN_MINUTES = 5;

const getTokenExpiration = () => {
  return Math.floor(Date.now() / 1000) + 60 * TOKEN_EXPIRATION_IN_MINUTES;
};

export const getConnectionTokenAction = authedAction.handler(
  async ({ ctx: { user } }) => {
    const CENTRIFUGO_TOKEN_SECRET = process.env.CENTRIFUGO_TOKEN_SECRET;
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

export const getSubscriptionTokenAction = authedAction
  .input(z.object({ channel: z.string() }))
  .handler(async ({ input: { channel }, ctx: { user } }) => {
    const CENTRIFUGO_TOKEN_SECRET = process.env.CENTRIFUGO_TOKEN_SECRET;
    if (!CENTRIFUGO_TOKEN_SECRET) {
      throw new Error("CENTRIFUGO_TOKEN_SECRET is not set");
    }
    const token = {
      sub: user.id,
      channel,
      exp: getTokenExpiration(),
    };

    const signedToken = jwt.sign(token, process.env.CENTRIFUGO_TOKEN_SECRET!, {
      algorithm: "HS256",
    });

    return { token: signedToken };
  });

export const getPublishMessageTokenAction = authedAction
  .input(z.object({ channel: z.string(), message: z.string() }))
  .output(z.object({ token: z.string() }))
  .handler(async ({ input: { channel, message }, ctx: { user } }) => {
    const CENTRIFUGO_TOKEN_SECRET = process.env.CENTRIFUGO_TOKEN_SECRET;

    if (!CENTRIFUGO_TOKEN_SECRET) {
      throw new Error("CENTRIFUGO_TOKEN_SECRET is not set");
    }

    const token = {
      sub: user.id,
      channel,
      content: message,
      timestamp: Date.now(),
    };

    const signedToken = jwt.sign(token, process.env.CENTRIFUGO_TOKEN_SECRET!, {
      algorithm: "HS256",
    });

    return { token: signedToken };
  });

export const encodeDataAction = authedAction.handler(
  async ({ ctx: { user } }) => {
    return encodeDataUseCase({
      userId: user.id!,
    });
  },
);
