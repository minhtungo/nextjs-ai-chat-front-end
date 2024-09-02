"use server";

import { chatAction } from "@/lib/safe-actions";
import { getTokenUseCase } from "@/use-cases/api";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";

export const getTokenAction = chatAction.handler(async ({ ctx: { user } }) => {
  let userId;

  if (!user) {
    if (getCookie("userId", { cookies })) {
      userId = getCookie("userId", { cookies });
    } else {
      userId = `guest-${uuid()}`;
      setCookie("userId", userId, { cookies });
    }
  } else {
    userId = user.id;
  }

  console.log("**************getTokenAction userId", userId);

  const token = await getTokenUseCase({
    userId: userId!,
  });

  return token;
});

export const getChatUserIdAction = chatAction.handler(({ ctx: { user } }) => {
  let userId;

  if (!user) {
    if (getCookie("userId", { cookies })) {
      userId = getCookie("userId", { cookies });
    } else {
      userId = `guest-${uuid()}`;
      setCookie("userId", userId, { cookies });
    }
  } else {
    userId = user.id;
  }

  console.log("**************getChatUserIdAction userId", userId);

  return {
    id: userId,
  };
});
