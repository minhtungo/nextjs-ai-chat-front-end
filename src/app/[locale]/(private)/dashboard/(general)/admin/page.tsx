import { getCurrentUser } from "@/lib/auth";
import { FC, Suspense } from "react";
import Overview from "@/components/private/admin/Overview";

interface AdminPageProps {}

const AdminPage: FC<AdminPageProps> = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Overview />
    </Suspense>
  );
};

export default AdminPage;
