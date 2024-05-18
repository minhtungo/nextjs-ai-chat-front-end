import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoogleAuthButton from "./GoogleAuthButton";

const SignUpForm = () => {
  return (
    <Card className="mx-auto w-full max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl">Đăng ký tải khoản Lumi</CardTitle>
        {/* <CardDescription>
          Enter your information to create an account
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Tên</Label>
            <Input
              id="full-name"
              type="text"
              placeholder="Họ và tên của bạn"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Tạo tài khoản
          </Button>
          <GoogleAuthButton />
        </div>
        <div className="mt-4 text-center text-sm">
          Bạn đã có tài khoản?{" "}
          <Link href="/sign-in" className="underline">
            Đăng nhập
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
