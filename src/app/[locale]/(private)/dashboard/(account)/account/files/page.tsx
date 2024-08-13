import PageTitle from "@/components/private/common/PageTitle";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Files",
};

const FilesPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return (
    <>
      <PageTitle title="Files" />
    </>
  );
};

export default FilesPage;
