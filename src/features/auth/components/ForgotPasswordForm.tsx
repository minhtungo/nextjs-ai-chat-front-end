"use client";

import { forgotPasswordAction } from "@/features/auth/actions";
import CardWrapper from "@/components/common/CardWrapper";
import SubmitButton from "@/components/common/SubmitButton";
import FormError from "@/features/auth/components/FormError";
import FormSuccess from "@/features/auth/components/FormSuccess";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { useTranslations } from "next-intl";
import { signInUrl } from "@/config/config";
import { forgotPasswordSchema } from "@/features/auth/schemas";

const ForgotPasswordForm = () => {
  const t = useTranslations("auth.ForgotPassword");

  const { data, error, execute, isPending } =
    useServerAction(forgotPasswordAction);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    await execute(values);
  };

  return (
    <CardWrapper
      headerLabel={t("title")}
      description={t("description")}
      backButtonHref={signInUrl}
      backButtonLabel={t("goBack")}
      noBorderMobile
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <FormError message={error.message} />}
          {data && data.message && <FormSuccess message={data.message} />}
          <SubmitButton className="w-full" isPending={isPending}>
            {t("cta")}
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotPasswordForm;
