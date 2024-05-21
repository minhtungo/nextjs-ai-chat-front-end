"use client";

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
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import FormWrapper from "./FormWrapper";
import SubmitButton from "../SubmitButton";
import { forgotPassword } from "@/actions/auth";

const ForgotPasswordForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof forgotPasswordSchema>) => {
    setErrorMessage("");
    setSuccessMessage("");

    startTransition(() => {
      forgotPassword(values).then((data) => {
        if (data?.error) {
          setErrorMessage(data.error);
        } else if (data?.success) {
          setSuccessMessage(data.success);
        }
      });
    });
  };

  return (
    <FormWrapper
      headerLabel="Quên mật khẩu"
      backButtonHref={signInHref}
      backButtonLabel="Quay lại đăng nhập"
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

          {errorMessage && <FormError message={errorMessage} />}
          {successMessage && <FormSuccess message={successMessage} />}
          <SubmitButton
            className="w-full"
            label="Lấy lại mật khẩu"
            isLoading={isPending}
          />
        </form>
      </Form>
    </FormWrapper>
  );
};

export default ForgotPasswordForm;
