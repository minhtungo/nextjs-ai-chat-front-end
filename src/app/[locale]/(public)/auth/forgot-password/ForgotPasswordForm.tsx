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
import { signInHref } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";

const ForgotPasswordForm = () => {
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
      headerLabel="Quên mật khẩu"
      backButtonHref={signInHref}
      backButtonLabel="Quay lại đăng nhập"
      noBorder
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
                  <Input type="email" placeholder="Địa chỉ email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && <FormError message={error.message} />}
          {data && data.message && <FormSuccess message={data.message} />}
          <SubmitButton
            className="w-full"
            label="Lấy lại mật khẩu"
            isPending={isPending}
          />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotPasswordForm;
