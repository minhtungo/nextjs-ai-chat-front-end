import { auth } from "@/auth";

const Dashboard = async () => {
  const session = await auth();

  return <div>{session && session.user?.email}</div>;
};

export default Dashboard;
