import "server-only";
import NodeCache from "node-cache";

import { createToken, decodeToken, encodeToken } from "@/lib/utils";
import { AccessToken } from "@/types/api";

const tokenCache = new NodeCache({ stdTTL: 3600 }); // Cache with 1-hour TTL

export const getTokenUseCase = async ({ userId }: { userId?: string }) => {
  try {
    if (!userId) {
      throw new Error("Something went wrong! Please try again later.");
    }
    const cachedToken = tokenCache.get("accessToken") as string;
    if (cachedToken) {
      const decodedToken = decodeToken(cachedToken) as AccessToken;
      const isExpired = Date.now() >= decodedToken.exp * 1000;

      if (!isExpired) {
        return cachedToken;
      }
    }

    const payload = createToken({
      uid: userId,
    });

    const newToken = encodeToken(payload);
    tokenCache.set("accessToken", newToken);

    return newToken;
  } catch (error) {
    throw new Error("Error getting token");
  }
};

// export const getTokenUseCase = async ({ userId }: { userId: string }) => {
//   try {
//     const payload = createToken({
//       uid: userId,
//     });
//     const newToken = encodeToken(payload);

//     return newToken;
//   } catch (error) {
//     console.error("Error getting token", error);
//     throw new Error("Error getting token");
//   }
// };
