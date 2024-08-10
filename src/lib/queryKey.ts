export const getMessagesQueryKey = (id: string) => ["getMessages", id];
export const getChatListQueryKey = () => ["getChatList"];
export const getMessageImageQueryKey = (path: string) => [
  "getMessageImage",
  path,
];
