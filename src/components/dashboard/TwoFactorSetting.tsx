import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";
import TwoFactorButton from "./TwoFactorButton";

interface TwoFactorSettingProps {
  isTwoFactorEnabled: boolean;
}

const TwoFactorSetting: FC<TwoFactorSettingProps> = ({
  isTwoFactorEnabled,
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-y-1">
          <CardTitle className="text-xl">
            Multi-Factor Authentication (MFA)
          </CardTitle>
          <Badge variant={isTwoFactorEnabled ? "secondary" : "outline"}>
            {isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>

        <CardDescription>
          Protect your account by adding an extra layer of security.
        </CardDescription>
      </CardHeader>
      {/* <CardContent className="w-full justify-end"></CardContent> */}
      <CardFooter className="justify-end border-t py-3 sm:py-3">
        <TwoFactorButton isTwoFactorEnabled={isTwoFactorEnabled} />
      </CardFooter>
    </Card>
  );
};

export default TwoFactorSetting;
