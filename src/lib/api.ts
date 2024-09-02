import { getTokenAction } from "@/actions/api";
import { env } from "@/env";

interface FetchAuthProps {
  baseUrl?: string;
  path: string;
  method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  body?: { [key: string]: any };
  formData?: FormData;
  responseType?: "json" | "blob";
  headers?: HeadersInit;
  tags?: string[];
}

export const fetchAuth = async ({
  baseUrl = env.NEXT_PUBLIC_CHAT_SERVER_URL,
  path,
  method = "GET",
  body,
  formData,
  responseType = "json",
  headers,
  tags,
}: FetchAuthProps) => {
  try {
    const [tokenRes, error] = await getTokenAction();

    if (error || !tokenRes) {
      console.log("Error getting tokens", error);
      throw new Error("Error getting tokens");
    }

    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        "Access-Token": tokenRes.token,
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
      ...(formData && { body: formData }),
      ...(tags && {
        next: { tags },
      }),
    });

    if (!response.ok) {
      return {
        error: response.statusText,
        statusCode: response.status,
      };
    }

    let data;

    if (responseType === "json") {
      data = await response.json();
    } else if (responseType === "blob") {
      data = response;
    }

    return {
      success: true,
      data,
      statusCode: response.status,
    };
  } catch (error) {
    return {
      error,
      statusCode: 400,
    };
  }
};
