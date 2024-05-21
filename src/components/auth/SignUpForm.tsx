"use client";

import Link from "next/link";

import { signUpWithCredentials } from "@/auth/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "./SubmitButton";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import FormWrapper from "./FormWrapper";
import GoogleAuthButton from "./GoogleAuthButton";
import { signInHref } from "@/routes";

const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    setErrorMessage("");

    startTransition(() => {
      signUpWithCredentials(values).then((data) => {
        if (data?.error) {
          setErrorMessage(data.error);
        } else if (data?.success) {
          setSuccessMessage(data.success);
        }
      });
    });
  };

  return (
    <FormWrapper headerLabel="Đăng ký tải khoản Lumi">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Họ và tên" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Địa chỉ email" {...field} />
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
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {errorMessage && <FormError message={errorMessage} />}
          {successMessage && <FormSuccess message={successMessage} />}
          <SubmitButton label="Tạo tài khoản" isLoading={isPending} />
        </form>
      </Form>
      <GoogleAuthButton className="mt-3" />
      <div className="mt-4 text-center text-sm">
        Bạn đã có tài khoản?{" "}
        <Link href={signInHref} className="underline">
          Đăng nhập
        </Link>
      </div>
    </FormWrapper>
  );
};

export default SignUpForm;
