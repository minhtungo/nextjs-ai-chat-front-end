export const getMessagesQueryKey = (id: string) => ["getMessages", id];

export const getChatListQueryKey = () => ["getChatList"];

export const getMessageImageQueryKey = (path: string) => [
  "getMessageImage",
  path,
];

export const getChatInfoQueryKey = (id: string) => ["getChatInfo", id];

export const queryKeys = {
  getMessagesQueryKey,
  getChatListQueryKey,
  getMessageImageQueryKey,
  getChatInfoQueryKey,
};
