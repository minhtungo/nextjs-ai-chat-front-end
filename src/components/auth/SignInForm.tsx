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
import CardWrapper from "../CardWrapper";
import GoogleAuthButton from "./GoogleAuthButton";
import { forgotPasswordHref, signUpHref } from "@/routes";
import { useTranslations } from "next-intl";
import FormSuccess from "./FormSuccess";

const SignInForm = () => {
  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect");
  const t = useTranslations("auth");

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "error.OAuthAccountNotLinked"
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
      signInWithCredentials(values, redirectURL)
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
        .catch(() => setErrorMessage("error.generalError"));
    });
  };

  return (
    <CardWrapper headerLabel={t("SignIn.title")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!showTwoFactor ? (
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
                        className="ml-auto inline-block text-sm underline"
                      >
                        {t("SignIn.fields.password.action")}
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
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
                    <FormLabel>2FA code</FormLabel>
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
          {(errorMessage || urlError) && (
            <FormError message={t(errorMessage || urlError)} />
          )}
          {/* {successMessage && <FormSuccess message={successMessage} />} */}
          <SubmitButton
            className="w-full"
            label={showTwoFactor ? t("SignIn.confirm") : t("SignIn.cta")}
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
      {!showTwoFactor && (
        <>
          <GoogleAuthButton />
          <div className="mt-4 text-center text-sm">
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
