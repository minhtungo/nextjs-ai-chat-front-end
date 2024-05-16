import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const LoginForm = () => {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Chào mừng đến với Lumi</CardTitle>
        {/* <CardDescription>
          Enter your email below to login to your account
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Địa chỉ email"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mật khẩu</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Quên mật khẩu?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>
          <Button variant="outline" className="w-full">
            Đăng nhập với Discord
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Bạn chưa có tài khoản?{" "}
          <Link href="/sign-up" className="underline">
            Đăng ký
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
