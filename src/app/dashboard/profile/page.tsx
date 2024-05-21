import { auth } from "@/auth";
import Container from "@/components/dashboard/Container";
import UserProfile from "@/components/dashboard/UserProfile";
import { getCurrentUser } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = async () => {
  const user = await getCurrentUser();

  return (
    <Container>
      <UserProfile user={user} />
    </Container>
  );
};

export default ProfilePage;
