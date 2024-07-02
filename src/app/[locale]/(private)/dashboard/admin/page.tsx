import { getCurrentUser } from "@/lib/auth";
import { FC } from "react";

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return <div></div>;
};

export default AdminPage;
