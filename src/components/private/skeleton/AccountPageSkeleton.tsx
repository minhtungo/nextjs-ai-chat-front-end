import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const AccountPageSkeleton = () => {
  return (
    <Card className="mx-auto w-full max-w-5xl" noBorderMobile>
      <CardContent className="w-full space-y-4">
        <Skeleton className="mb-6 size-16 rounded-full border sm:size-24" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="space-y-2.5" key={`user-profile-${i}`}>
            <Skeleton className="h-5 w-14" key={`user-profile-${i}-skeleton`} />
            <Skeleton
              className="h-9 w-full"
              key={`user-profile-${i}-skeleton`}
            />
          </div>
        ))}
        <Skeleton className="h-9 w-24" />
      </CardContent>
    </Card>
  );
};

export default AccountPageSkeleton;
