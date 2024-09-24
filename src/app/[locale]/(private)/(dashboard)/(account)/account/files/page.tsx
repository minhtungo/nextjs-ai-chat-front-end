import FilesLibrary from "@/components/files/FilesLibrary";
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

  // const assets = await getUserUploadedFilesUseCase(user.id!);

  return <FilesLibrary />;
};

export default FilesPage;
