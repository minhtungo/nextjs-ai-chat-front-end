"use client";

import CardWrapper from "@/components/common/CardWrapper";
import PasswordInput from "@/components/common/PasswordInput";
import SubmitButton from "@/components/common/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { setNewPasswordAction } from "@/features/auth/actions";
import FormError from "@/features/auth/components/FormError";
import FormSuccess from "@/features/auth/components/FormSuccess";
import { resetPasswordSchema } from "@/features/auth/schemas";
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
    <CardWrapper
      headerLabel={t("ResetPassword.title")}
      description={t("ResetPassword.description")}
      noBorderMobile
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
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
            isPending={isPending}
            disabled={!token}
          >
            {t("ResetPassword.cta")}
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
