"use client";

import { signInWithCredentialsAction } from "@/actions/auth";
import CardWrapper from "@/components/CardWrapper";
import SubmitButton from "@/components/SubmitButton";
import FacebookLogin from "@/components/auth/FacebookLogin";
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
import { signInSchema } from "@/lib/definitions";
import { forgotPasswordHref, signUpHref } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";

const SignInForm = () => {
  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect");
  const t = useTranslations("auth");

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "error.OAuthAccountNotLinked"
      : "";

  const { isPending, execute, data, error } = useServerAction(
    signInWithCredentialsAction,
  );

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const [_, error] = await execute({ values, redirectURL });

    if (error) {
      form.reset();
      form.setFocus("email");
    }
  };

  return (
    <CardWrapper headerLabel={t("SignIn.title")} noBorder>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!data ? (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("SignIn.fields.email.label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("SignIn.fields.email.placeholder")}
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
                      <FormLabel>{t("SignIn.fields.password.label")}</FormLabel>
                      <Link
                        href={forgotPasswordHref}
                        className="ml-auto inline-block text-xs hover:underline"
                      >
                        {t("SignIn.fields.password.action")}
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        placeholder={t("SignIn.fields.password.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormSuccess message={t("success.twoFactorEmailSent")} />
            </>
          )}
          {/* @ts-ignore*/}
          {(error || urlError) && (
            <FormError message={t(error.message || urlError)} />
          )}
          {/* {successMessage && <FormSuccess message={successMessage} />} */}
          <SubmitButton
            className="w-full"
            label={
              data && data.twoFactor ? t("SignIn.confirm") : t("SignIn.cta")
            }
            isLoading={isPending}
          />
        </form>
      </Form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("OAuth.alternative")}
          </span>
        </div>
      </div>
      {!data && (
        <>
          <Suspense>
            <div className="grid grid-cols-2 gap-3">
              <GoogleLogin />
              <FacebookLogin />
            </div>
          </Suspense>
          <div className="mt-6 text-center text-sm">
            {t("SignIn.action.title")}{" "}
            <Link href={signUpHref} className="underline">
              {t("SignIn.action.link")}
            </Link>
          </div>
        </>
      )}
    </CardWrapper>
  );
};

export default SignInForm;
