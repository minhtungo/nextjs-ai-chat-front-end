import { createServerActionProcedure } from "zsa";
import { getCurrentUser } from "./auth";
import { getUserRole } from "@/data/user";

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

const isAdminProcedure = createServerActionProcedure(authedProcedure).handler(
  async ({ ctx: { user } }) => {
    const role = await getUserRole(user.id!);

    if (!role || role.role !== "ADMIN") {
      throw new Error("User is not an admin");
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        role,
      },
    };
  },
);

export const authedAction = authedProcedure.createServerAction();
export const isAdminAction = isAdminProcedure.createServerAction();
