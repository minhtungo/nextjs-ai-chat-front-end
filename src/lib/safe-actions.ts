import { createServerActionProcedure } from "zsa";
import { getCurrentUser } from "./auth";

export const authedProcedure = createServerActionProcedure().handler(
  async () => {
    try {
      const user = await getCurrentUser();

      if (!user) {
        throw new Error("User not authenticated");
      }
      return { user };
    } catch {
      throw new Error("User not authenticated");
    }
  },
);

export const authedAction = authedProcedure.createServerAction();

const isAdminProcedure = createServerActionProcedure(authedProcedure).handler(
  async ({ ctx }) => {
    return {
      user: {
        id: ctx.user.id,
        email: ctx.user.email,
      },
    };
  },
);
