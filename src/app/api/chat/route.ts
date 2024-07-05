export async function POST(req: Request) {
  const { message, chatID } = await req.json();

  //   pusherServer.trigger(chatID, "newMessage", message);
  return Response.json({ success: true });
}
