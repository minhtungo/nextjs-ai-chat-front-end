import { createServerActionProcedure } from "zsa";
import { getCurrentUser } from "./auth";

export const authedProcedure = createServerActionProcedure()
  .handler(async () => {
    try {
      const user = await getCurrentUser();

      if (!user) {
        throw new Error("User not authenticated");
      }
      return { user };
    } catch {
      throw new Error("User not authenticated");
    }
  })
  .createServerAction();
