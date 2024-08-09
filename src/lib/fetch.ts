import { createToken, encodeData } from "@/lib/utils";

interface FetchAuthProps {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  body?: { [key: string]: any };
  token: { [key: string]: any };
  formData?: FormData;
  baseUrl?: string;
}

export const fetchAuth = async ({
  url,
  method,
  body,
  token,
  formData,
  baseUrl = process.env.CHAT_SERVER_URL,
}: FetchAuthProps) => {
  try {
    const accessToken = encodeData(createToken(token));

    const response = await fetch(`${baseUrl}${url}`, {
      method: method,
      headers: {
        "Access-Token": accessToken!,
      },
      ...(body && { body: JSON.stringify(body) }),
      ...(formData && { body: formData }),
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data,
        statusCode: response.status,
      };
    } else {
      return {
        error: true,
        statusCode: response.status,
      };
    }
  } catch (error) {
    return {
      error,
      statusCode: 400,
    };
  }
};
