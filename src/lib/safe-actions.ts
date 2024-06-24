import { createServerActionProcedure } from "zsa";
import { getCurrentUser } from "./auth";

export const authedProcedure = createServerActionProcedure().handler(
  async () => {
    try {
      const user = await getCurrentUser();
      return { user };
    } catch {
      throw new Error("User not authenticated");
    }
  },
);
