"use client";

import { signInWithCredentialsAction } from "@/actions/auth";
import CardWrapper from "@/components/common/CardWrapper";
import SubmitButton from "@/components/common/SubmitButton";
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
import { signInSchema } from "@/lib/definitions";
import { forgotPasswordHref, signUpHref } from "@/lib/routes";
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

    // if (error) {
    //   form.reset();
    //   form.setFocus("email");
    // }
  };

  return (
    <CardWrapper headerLabel={t("SignIn.title")} noBorder>
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
                        className="ml-auto inline-block text-sm text-muted-foreground hover:underline"
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
          <div className="pt-2">
            <SubmitButton className="w-full" isPending={isPending}>
              {data && data.twoFactor ? t("SignIn.confirm") : t("SignIn.cta")}
            </SubmitButton>
          </div>
        </form>
      </Form>
      <div className="mt-6 text-center text-sm">
        {t("SignIn.action.title")}{" "}
        <Link href={signUpHref} className="underline">
          {t("SignIn.action.link")}
        </Link>
      </div>
    </CardWrapper>
  );
};

export default SignInForm;
