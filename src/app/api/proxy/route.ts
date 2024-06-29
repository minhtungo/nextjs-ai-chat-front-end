import { auth } from "@/auth";
import jwt from "jsonwebtoken";

export const GET = auth(async (req, { params }) => {
  if (!req?.auth?.user) {
    return Response.json(
      { error: "Unauthorized" },
      {
        status: 401,
        statusText: "You must be logged in to perform this action",
      },
    );
  }

  const user = req.auth.user;

  const signedToken = jwt.sign(
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: {
        iat: user.iat,
        exp: user.exp,
      },
    },
    process.env.AUTH_SECRET!,
    {
      algorithm: "HS512",
    },
  );

  const response = await fetch(`${process.env.EXTERNAL_BACKEND_BASE_URL}/api`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${signedToken}`,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return Response.json({ data });
  } else {
    return Response.json(
      { error: "Failed to fetch from Python server" },
      { status: response.status },
    );
  }
});

// const tokenCache = new NodeCache({ stdTTL: 300 });

// export const GET = auth(async (req, { params }) => {
//   const token = await getToken({
//     req,
//     secret: process.env.AUTH_SECRET!,
//     secureCookie: process.env.NODE_ENV === "production",
//     salt:
//       process.env.NODE_ENV === "production"
//         ? "__Secure-authjs.session-token"
//         : "authjs.session-token",
//   });

//   const cachedToken = tokenCache.get("jwt");

//   let signedToken;

//   if (cachedToken) {
//     signedToken = cachedToken;
//   } else {
//     const token = await getToken({
//       req,
//       secret: process.env.AUTH_SECRET!,
//       secureCookie: process.env.NODE_ENV === "production",
//       salt:
//         process.env.NODE_ENV === "production"
//           ? "__Secure-authjs.session-token"
//           : "authjs.session-token",
//     });

//     if (token !== null) {
//       signedToken = jwt.sign(token, process.env.AUTH_SECRET!, {
//         algorithm: "HS512",
//       });
//       tokenCache.set("jwt", signedToken);
//     } else {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }
//   }

//   const response = await fetch(`${process.env.EXTERNAL_BACKEND_BASE_URL}/api`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${signedToken}`,
//     },
//   });

//   if (response.ok) {
//     const data = await response.json();
//     return Response.json({ data });
//   } else {
//     return Response.json(
//       { error: "Failed to fetch from Python server" },
//       { status: response.status },
//     );
//   }
// });
