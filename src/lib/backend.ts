import { headers } from "next/headers";

export const fetchFromPythonServer = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/proxy`,
    {
      method: "GET",
      headers: headers(),
    },
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("Failed to fetch from Python server");
  }
};
