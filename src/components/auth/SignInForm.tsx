"use client";

import { signInWithCredentials } from "@/actions/auth";
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
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import FormError from "./FormError";
import FormWrapper from "./FormWrapper";
import GoogleAuthButton from "./GoogleAuthButton";
import { forgotPasswordHref, signUpHref } from "@/routes";

const SignInForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different credentials"
      : "";

  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  // const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    setErrorMessage("");

    startTransition(() => {
      signInWithCredentials(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setErrorMessage(data.error);
          }
          // else if (data?.success) {
          //   setSuccessMessage(data?.success);
          // }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setErrorMessage("Something went wrong"));
    });
  };

  return (
    <FormWrapper headerLabel="Chào mừng đến với Lumi">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!showTwoFactor ? (
            <>
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
                        href={forgotPasswordHref}
                        className="ml-auto inline-block text-sm underline"
                      >
                        Quên mật khẩu?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>2FA code</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(errorMessage || urlError) && (
            <FormError message={errorMessage || urlError} />
          )}
          {/* {successMessage && <FormSuccess message={successMessage} />} */}
          <SubmitButton
            className="w-full"
            label={showTwoFactor ? "Xác nhận" : "Đăng nhập"}
            isLoading={isPending}
          />
        </form>
      </Form>
      {!showTwoFactor && (
        <>
          <GoogleAuthButton className="mt-3" />
          <div className="mt-4 text-center text-sm">
            Bạn chưa có tài khoản?{" "}
            <Link href={signUpHref} className="underline">
              Đăng ký
            </Link>
          </div>
        </>
      )}
    </FormWrapper>
  );
};

export default SignInForm;
