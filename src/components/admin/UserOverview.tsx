import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTotalUsersUseCase } from "@/use-cases/admin/user";
import { User } from "lucide-react";
import { FC } from "react";

interface UserOverviewProps {}

const UserOverview: FC<UserOverviewProps> = async () => {
  const totalUsers = await getTotalUsersUseCase();
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader
          className="flex flex-row items-center justify-between space-y-0"
          size="sm"
        >
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <User className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent size="sm">
          <div className="text-2xl font-bold">{totalUsers}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOverview;
