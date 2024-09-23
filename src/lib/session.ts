import "server-only";
import { getCurrentUser } from "@/lib/auth";
import { AuthenticationError } from "@/lib/error";
import { getCookie, getCookies, setCookie } from "cookies-next";
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

  let id = cookies().get("chatUserId")?.value;
  console.log("getChatUser", id);

  if (!id) {
    id = `guest-${uuid()}`;
    cookies().set("chatUserId", id);
  }

  return {
    id,
    isGuest: true,
  };
};

export const getChatToken = (userId: string) => {
  let token = cookies().get("chatToken")?.value;
  console.log("getChatToken", token);

  if (token) {
    return token;
  }

  const payload = createToken({
    uid: userId,
  });

  token = encodeToken(payload);
  cookies().set("chatToken", token);

  return token;
};
