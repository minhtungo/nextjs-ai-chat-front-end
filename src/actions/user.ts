import { authedAction } from "@/lib/safe-actions";
import { getTokenUseCase } from "@/use-cases/user";
("use server");

export const getMessageImagesAction = authedAction.handler(
  async ({ ctx: { user } }) => {
    const token = await getTokenUseCase(user.id!);
    return { token };
  },
);
