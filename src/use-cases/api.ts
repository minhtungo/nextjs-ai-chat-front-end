import "server-only";
import NodeCache from "node-cache";

import {
  AccessToken,
  createToken,
  decodeToken,
  encodeToken,
} from "@/lib/utils";

const tokenCache = new NodeCache({ stdTTL: 3600 }); // Cache with 1-hour TTL

export const getTokenUseCase = async ({ userId }: { userId: string }) => {
  try {
    const cachedToken = tokenCache.get("accessToken") as string;
    console.log("Started Cached token", cachedToken);
    if (cachedToken) {
      const decodedToken = decodeToken(cachedToken) as AccessToken;
      const isExpired = Date.now() >= decodedToken.exp * 1000;

      console.log("Cached isExpired", isExpired);

      if (!isExpired) {
        console.log("Returning cached token", cachedToken);
        return {
          token: cachedToken,
        };
      }
    }

    const payload = createToken({
      uid: userId,
    });

    const newToken = encodeToken(payload);
    tokenCache.set("accessToken", newToken);

    console.log("Returning new token", newToken);

    return {
      token: newToken,
    };
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
