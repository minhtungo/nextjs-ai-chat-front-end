import "server-only";
import { getCurrentUser } from "@/lib/auth";
import { AuthenticationError } from "@/lib/error";
import { getCookie, setCookie } from "cookies-next";
import { User } from "next-auth";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";
import { createToken, encodeToken } from "@/lib/utils";

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};

export const getChatUser = (user: User | undefined) => {
  if (user) {
    return user;
  }

  let id = getCookie("userId", { cookies });

  if (!id) {
    id = `guest-${uuid()}`;
    setCookie("userId", id, { cookies });
  }

  return {
    id,
    isGuest: true,
  };
};

export const getChatToken = (userId: string) => {
  let token = getCookie("chatToken", { cookies });

  if (token) {
    return token;
  }

  const payload = createToken({
    uid: userId,
  });

  token = encodeToken(payload);
  setCookie("chatTokenasdasd", token, { cookies });

  return token;
};
