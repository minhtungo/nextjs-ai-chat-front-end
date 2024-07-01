"use client";

import { setNewPasswordAction } from "@/actions/auth";
import CardWrapper from "@/components/CardWrapper";
import SubmitButton from "@/components/SubmitButton";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import PasswordInput from "@/components/auth/PasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const t = useTranslations("auth");

  const { data, error, execute, isPending } =
    useServerAction(setNewPasswordAction);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    if (!token) return;

    await execute({ values, token });
  };

  return (
    <CardWrapper headerLabel={t("ResetPassword.title")} noBorder>
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
          {error && <FormError message={t(error.message as any)} />}
          {!token && <FormError message={t("error.tokenMissing")} />}
          {data && data.message && (
            <FormSuccess message={t(data.message as any)} />
          )}
          <SubmitButton
            className="w-full"
            label={t("ResetPassword.cta")}
            isLoading={isPending}
            disabled={!token}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
