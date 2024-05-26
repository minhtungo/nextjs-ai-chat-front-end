"use client";

import { setNewPassword } from "@/actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardWrapper from "../CardWrapper";
import SubmitButton from "../SubmitButton";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import PasswordInput from "./PasswordInput";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const t = useTranslations("auth");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof resetPasswordSchema>) => {
    setErrorMessage("");

    startTransition(() => {
      setNewPassword(values, token).then((data) => {
        if (data?.error) {
          setErrorMessage(data.error);
        } else if (data?.success) {
          setSuccessMessage(data.success);
        }
      });
    });
  };

  return (
    <CardWrapper headerLabel={t("ResetPassword.title")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("ResetPassword.fields.password.label")}
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={t("ResetPassword.fields.password.placeholder")}
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
                  {t("ResetPassword.fields.confirmPassword.label")}
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder={t(
                      "ResetPassword.fields.confirmPassword.placeholder",
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* @ts-ignore*/}
          {errorMessage && <FormError message={t(errorMessage)} />}
          {/* @ts-ignore*/}
          {successMessage && <FormSuccess message={t(successMessage)} />}
          <SubmitButton
            className="w-full"
            label={t("ResetPassword.cta")}
            isLoading={isPending}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
