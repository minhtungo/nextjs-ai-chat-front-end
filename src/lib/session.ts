import { getCurrentUser } from "@/lib/auth";
import { AuthenticationError } from "@/lib/error";
import "server-only";

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};
