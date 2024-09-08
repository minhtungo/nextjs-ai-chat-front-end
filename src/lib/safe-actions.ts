"import server";

import { getUserRole } from "@/data/user";
import { getCurrentUser } from "@/lib/auth";
import { assertAuthenticated } from "@/lib/session";
import { createServerActionProcedure } from "zsa";

export const authenticatedProcedure = createServerActionProcedure().handler(
  async () => {
    const user = await assertAuthenticated();
    return { user };
  },
);

export const chatProcedure = createServerActionProcedure().handler(async () => {
  const user = await getCurrentUser();

  return { user };

  // if (!user) {
  //   user = {
  //     id: cookies().set()`guest-${uuid()}`,
  //   } as any;
  // }

  // cookies().set("userId", user?.id!);

  // return {
  //   user,
  // };
});

const isAdminProcedure = createServerActionProcedure(
  authenticatedProcedure,
).handler(async ({ ctx: { user } }) => {
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
});

export const authenticatedAction = authenticatedProcedure.createServerAction();

export const isAdminAction = isAdminProcedure.createServerAction();

export const chatAction = chatProcedure.createServerAction();
