import { createToken, encodeData } from "@/lib/utils";

interface FetchAuthProps {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  body?: { [key: string]: any };
  token: { [key: string]: any };
  formData?: FormData;
}

export const fetchAuth = async ({
  url,
  method,
  body,
  token,
  formData,
}: FetchAuthProps) => {
  try {
    const accessToken = encodeData(createToken(token));

    const response = await fetch(`${process.env.SERVER_BASE_URL}${url}`, {
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
        success: false,
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
