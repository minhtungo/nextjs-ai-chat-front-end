"use client";

import Link from "next/link";

import { signUpWithCredentialsAction } from "@/features/auth/actions";
import FormError from "@/features/auth/components/FormError";
import FormSuccess from "@/features/auth/components/FormSuccess";
import OAuthButtons from "@/features/auth/components/OAuthButtons";
import CardWrapper from "@/components/common/CardWrapper";
import PasswordInput from "@/components/common/PasswordInput";
import SubmitButton from "@/components/common/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { signInUrl } from "@/config/config";
import { signUpSchema } from "@/features/auth/schemas";

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
    <CardWrapper
      headerLabel={t("SignUp.title")}
      description={t("SignUp.description")}
      noBorderMobile
    >
      <Suspense>
        <OAuthButtons />
      </Suspense>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
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
          <div className="grid gap-3 pt-2">
            <SubmitButton className="w-full" isPending={isPending}>
              {t("SignUp.cta")}
            </SubmitButton>
            {/* <Button className="w-full" variant="outline">
              <span>{t("SignUp.action.goBack")}</span>
            </Button> */}
          </div>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        {t("SignUp.action.title")}{" "}
        <Link href={signInUrl} className="underline">
          {t("SignUp.action.link")}
        </Link>
      </div>
    </CardWrapper>
  );
};

export default SignUpForm;
