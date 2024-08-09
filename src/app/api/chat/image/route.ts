import { fetchAuth } from "@/lib/fetch";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");

  const response = await fetchAuth({
    baseUrl: process.env.NEXT_PUBLIC_ASSET_SERVER_URL,
    path: path!,
    responseType: "blob",
  });

  const blob = await response.data.arrayBuffer();

  const headers = new Headers();
  headers.set("Content-Type", "image/*");

  return new Response(blob, {
    status: 200,
    statusText: "OK",
    headers,
  });
}

// export const GET = auth(async (req, { params }) => {
//   if (!req?.auth?.user) {
//     return Response.json(
//       { error: "Unauthorized" },
//       {
//         status: 401,
//         statusText: "You must be logged in to perform this action",
//       },
//     );
//   }

//   const { searchParams } = new URL(req.url);
//   const path = searchParams.get("path");
//   console.log("path", path);
//   console.log("params", params);

//   const response = await fetchAuth({
//     baseUrl: process.env.NEXT_PUBLIC_ASSET_SERVER_URL,
//     path: path!,
//     responseType: "blob",
//   });

//   if (response.success) {
//     return Response.json(
//       { data: response.data },
//       {
//         status: 200,
//         statusText: "OK",
//       },
//     );
//   } else {
//     return Response.json(
//       { error: "Failed to fetch image" },
//       { status: response.statusCode },
//     );
//   }
// });
