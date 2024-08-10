"use server";

import { authedAction } from "@/lib/safe-actions";
import { getTokenUseCase } from "@/use-cases/api";

export const getTokenAction = authedAction.handler(
  async ({ ctx: { user } }) => {
    try {
      const token = await getTokenUseCase({
        userId: user.id!,
      });

      return token;
    } catch (error) {
      throw new Error("Error fetching token");
    }
  },
);
