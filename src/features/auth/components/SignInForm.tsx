"use client";

import { signInWithCredentialsAction } from "@/features/auth/actions";
import CardWrapper from "@/components/common/CardWrapper";
import SubmitButton from "@/components/common/SubmitButton";
import FormError from "@/features/auth/components/FormError";
import FormSuccess from "@/features/auth/components/FormSuccess";
import OAuthButtons from "@/features/auth/components/OAuthButtons";
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
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { forgotPasswordUrl, signUpUrl } from "@/config/config";
import PasswordInput from "@/components/common/PasswordInput";
import { signInSchema } from "@/features/auth/schemas";

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
    await execute({ values, redirectURL });
  };

  return (
    <CardWrapper
      headerLabel={t("SignIn.title")}
      description={t("SignIn.description")}
      noBorderMobile
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {!data ? (
            <>
              <Suspense>
                <OAuthButtons />
              </Suspense>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
            <FormError message={t(error?.message || urlError)} />
          )}
          {/* {successMessage && <FormSuccess message={successMessage} />} */}
          <div className="pt-2">
            <SubmitButton className="w-full" isPending={isPending}>
              {data && data.twoFactor ? t("SignIn.confirm") : t("SignIn.cta")}
            </SubmitButton>
          </div>
        </form>
      </Form>
      <div className="mt-6 text-center text-sm">
        {t("SignIn.action.title")}{" "}
        <Link href={signUpUrl} className="underline">
          {t("SignIn.action.link")}
        </Link>
      </div>
      <div className="mt-2 text-center">
        <Link
          href={forgotPasswordUrl}
          className="inline-block text-xs text-muted-foreground hover:underline"
        >
          {t("SignIn.fields.password.action")}
        </Link>
      </div>
    </CardWrapper>
  );
};

export default SignInForm;
