import { auth } from "@/auth";

const Dashboard = async () => {
  const session = await auth();
  console.log(session);
  return <div>{session && session.user?.email}</div>;
};

export default Dashboard;
