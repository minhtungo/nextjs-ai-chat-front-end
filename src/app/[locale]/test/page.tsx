import { fetchFromPythonServer } from "@/lib/backend";
import { FC } from "react";

interface PageNamePageProps {}

const PageNamePage: FC<PageNamePageProps> = async () => {
  const data = await fetchFromPythonServer();

  if (!data) return <p>No data</p>;
  return <div>{JSON.stringify(data)}</div>;
};

export default PageNamePage;
