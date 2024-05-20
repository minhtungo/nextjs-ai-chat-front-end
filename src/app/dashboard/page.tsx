import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const Dashboard = async () => {
  const session = await auth();

  return <div>{session && session.user?.email}</div>;
};

export default Dashboard;
