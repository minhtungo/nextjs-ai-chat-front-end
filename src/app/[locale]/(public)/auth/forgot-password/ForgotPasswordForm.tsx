"use client";

import { forgotPasswordAction } from "@/actions/auth";
import CardWrapper from "@/components/common/CardWrapper";
import SubmitButton from "@/components/common/SubmitButton";
import FormError from "@/components/auth/FormError";
import FormSuccess from "@/components/auth/FormSuccess";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/lib/definitions";
import { signInHref } from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { useTranslations } from "next-intl";

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
      backButtonHref={signInHref}
      backButtonLabel={t("goBack")}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <FormError message={error.message} />}
          {data && data.message && <FormSuccess message={data.message} />}
          <SubmitButton className="w-full" isPending={isPending} size="sm">
            {t("cta")}
          </SubmitButton>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotPasswordForm;
