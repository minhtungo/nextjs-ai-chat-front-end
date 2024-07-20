"use client";

import Link from "next/link";

import { signUpWithCredentialsAction } from "@/actions/auth";
import CardWrapper from "@/components/common/CardWrapper";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import OAuthButtons from "@/components/auth/OAuthButtons";
import PasswordInput from "@/components/common/PasswordInput";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import SubmitButton from "@/components/common/SubmitButton";

const SignUpForm = () => {
  const { data, error, isPending, execute } = useServerAction(
    signUpWithCredentialsAction,
  );
  const [isSignUpByEmail, setIsSignUpByEmail] = useState(false);

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
      {!isSignUpByEmail ? (
        <>
          <Suspense>
            <OAuthButtons />
          </Suspense>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsSignUpByEmail(true)}
          >
            <Mail className="size-4 sm:size-5" />{" "}
            <span>{t("SignUp.action.signUpByEmail")}</span>
          </Button>
        </>
      ) : (
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
                      placeholder={t(
                        "SignUp.fields.confirmPassword.placeholder",
                      )}
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
              <SubmitButton
                className="w-full"
                label={t("SignUp.cta")}
                isPending={isPending}
              />
              <Button
                className="w-full"
                variant="outline"
                onClick={() => setIsSignUpByEmail(false)}
              >
                <span>{t("SignUp.action.goBack")}</span>
              </Button>
            </div>
          </form>
        </Form>
      )}

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
