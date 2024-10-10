import { isAdminAction } from "@/lib/safe-actions";
import { getTotalUsersUseCase } from "@/use-cases/admin/user";

export const getTotalUsersAction = isAdminAction.handler(async ({ ctx }) => {
  try {
    return await getTotalUsersUseCase();
  } catch (error) {
    throw new Error("Error fetching chat");
  }
});
