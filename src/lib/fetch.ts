import { getTokenAction } from "@/actions/centrifuge";

interface FetchAuthProps {
  baseUrl?: string;
  path: string;
  method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  body?: { [key: string]: any };
  formData?: FormData;
  responseType?: "json" | "blob";
  headers?: HeadersInit;
}

export const fetchAuth = async ({
  baseUrl = process.env.NEXT_PUBLIC_CHAT_SERVER_URL,
  path,
  method = "GET",
  body,
  formData,
  responseType = "json",
  headers,
}: FetchAuthProps) => {
  try {
    const [accessToken, error] = await getTokenAction();

    if (error) {
      throw new Error("Error fetching token");
    }

    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers: {
        "Access-Token": accessToken!,
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
      ...(formData && { body: formData }),
    });

    if (!response.ok) {
      return {
        error: true,
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
