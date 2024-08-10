export const GET = async (req: Request) => {
  console.log("Testing api is called");

  return Response.json({
    message: "Hello world",
  });
};
