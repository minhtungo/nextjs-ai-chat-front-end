"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EmailAuthButton from "./EmailAuthButton";
import GoogleAuthButton from "./GoogleAuthButton";
import FormError from "./FormError";
import { startTransition, useState } from "react";
import { signInWithCredentials } from "@/auth/actions";

const SignInForm = () => {
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    setError("");

    startTransition(() => {
      signInWithCredentials(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl">Chào mừng đến với Lumi</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Địa chỉ email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Mật khẩu</FormLabel>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormError message={error} />}
            <EmailAuthButton />
            <GoogleAuthButton />
            <div className="mt-4 text-center text-sm">
              Bạn chưa có tài khoản?{" "}
              <Link href="/sign-up" className="underline">
                Đăng ký
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
