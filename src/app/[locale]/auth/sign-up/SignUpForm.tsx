"use client";

import Link from "next/link";

import { signUpWithCredentialsAction } from "@/actions/auth";
import CardWrapper from "@/components/CardWrapper";
import SubmitButton from "@/components/SubmitButton";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import GoogleLogin from "@/components/auth/GoogleLogin";
import PasswordInput from "@/components/auth/PasswordInput";
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
import { signInHref } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import FacebookLogin from "@/components/auth/FacebookLogin";

const SignUpForm = () => {
  const { data, error, isPending, execute } = useServerAction(
    signUpWithCredentialsAction,
  );

  const t = useTranslations("auth");

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    await execute(values);
  };

  return (
    <CardWrapper headerLabel={t("SignUp.title")} noBorder>
      <Suspense>
        <div className="grid grid-cols-2 gap-3">
          <GoogleLogin />
          <FacebookLogin />
        </div>
      </Suspense>
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("OAuth.alternative")}
          </span>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("SignUp.fields.name.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("SignUp.fields.name.placeholder")}
                    {...field}
                  />
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
                <FormLabel>{t("SignUp.fields.email.label")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("SignUp.fields.email.placeholder")}
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
                <FormLabel>{t("SignUp.fields.password.label")}</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={t("SignUp.fields.password.placeholder")}
                    {...field}
                  />
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
                <FormLabel>
                  {t("SignUp.fields.confirmPassword.label")}
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={t("SignUp.fields.confirmPassword.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* @ts-ignore*/}
          {error && <FormError message={t(error.message)} />}
          {/* @ts-ignore*/}
          {data && data.message && <FormSuccess message={t(data.message)} />}
          <SubmitButton
            className="w-full"
            label={t("SignUp.cta")}
            isPending={isPending}
          />
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        {t("SignUp.action.title")}{" "}
        <Link href={signInHref} className="underline">
          {t("SignUp.action.link")}
        </Link>
      </div>
    </CardWrapper>
  );
};

export default SignUpForm;
