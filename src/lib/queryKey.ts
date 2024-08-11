export const CHAT_LIST_QUERY_KEY = "getChatList";
export const MESSAGES_QUERY_KEY = "getMessages";
export const MESSAGE_IMAGE_QUERY_KEY = "getMessageImage";
export const CHAT_INFO_QUERY_KEY = "getChatInfo";

export const getMessagesQueryKey = (id: string) => [MESSAGES_QUERY_KEY, id];

export const getChatListQueryKey = () => [CHAT_LIST_QUERY_KEY];

export const getMessageImageQueryKey = (path: string) => [
  MESSAGE_IMAGE_QUERY_KEY,
  path,
];

export const getChatInfoQueryKey = (id: string) => [CHAT_INFO_QUERY_KEY, id];

export const queryKeys = {
  getMessagesQueryKey,
  getChatListQueryKey,
  getMessageImageQueryKey,
  getChatInfoQueryKey,
};
