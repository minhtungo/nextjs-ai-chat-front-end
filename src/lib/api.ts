import { env } from "@/config/env";
import { ApiResponseType } from "@/lib/response";

interface RequestOptions {
  path?: string;
  method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: any;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  cookie?: string;
  type?: "body" | "formData";
}

const fetchApi = async (
  url: string,
  options: RequestOptions = {},
): Promise<ApiResponseType> => {
  const {
    method = "GET",
    headers = {},
    body,
    cookie,
    cache = "no-store",
    next,
    path,
    type,
  } = options;
  console.log("fetchApi Header", headers);

  // const [token, error] = await getTokenAction();
  const token = "123";
  const error = null;

  if (error || !token) {
    console.log("Error getting tokens", error);
    throw new Error("Error getting tokens");
  }

  const response = await fetch(`${url}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Token": token,
      ...headers,
      ...(cookie ? { Cookie: cookie } : {}),
    },
    ...(body && { body: type === "body" ? JSON.stringify(body) : body }),
    ...(cache && { cache }),
    ...(next && { next }),
  });

  console.log("fetchApi", response);

  if (!response.ok) {
    return {
      success: false,
      data: undefined,
      statusCode: response.status,
    };
  }

  const data = await response.json();

  return {
    success: true,
    data,
    statusCode: response.status,
  };
};

export const chatApi = {
  get(path: string, options?: RequestOptions): Promise<ApiResponseType> {
    return fetchApi(env.NEXT_PUBLIC_CHAT_SERVER_URL, {
      ...options,
      path,
      method: "GET",
    });
  },
  post(
    path: string,
    body?: any,
    options?: Omit<RequestOptions, "body" | "path">,
  ): Promise<ApiResponseType> {
    return fetchApi(env.NEXT_PUBLIC_CHAT_SERVER_URL, {
      ...options,
      method: "POST",
      body,
      path,
    });
  },
  put(
    path: string,
    body?: any,
    options?: RequestOptions,
  ): Promise<ApiResponseType> {
    return fetchApi(env.NEXT_PUBLIC_CHAT_SERVER_URL, {
      ...options,
      method: "PUT",
      body,
      path,
    });
  },
  patch(
    path: string,
    body?: any,
    options?: RequestOptions,
  ): Promise<ApiResponseType> {
    return fetchApi(env.NEXT_PUBLIC_CHAT_SERVER_URL, {
      ...options,
      method: "PATCH",
      body,
      path,
    });
  },
  delete(path: string, options?: RequestOptions): Promise<ApiResponseType> {
    return fetchApi(env.NEXT_PUBLIC_CHAT_SERVER_URL, {
      ...options,
      method: "DELETE",
      path,
    });
  },
};
