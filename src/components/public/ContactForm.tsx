"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { sendContactUsFormAction } from "@/actions/mail";
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
import { contactUsFormSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import SubmitButton from "@/components/common/SubmitButton";

const ContactUsForm = () => {
  const { isPending, execute, data, error } = useServerAction(
    sendContactUsFormAction,
  );

  const t = useTranslations("form.ContactUs");

  const form = useForm<z.infer<typeof contactUsFormSchema>>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactUsFormSchema>) => {
    await execute(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex max-w-xl flex-col gap-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("phoneNumber")}</FormLabel>
              <FormControl>
                <Input type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("message")}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <FormError message={t(error.message as any)} />}
        {data && data.message && (
          <FormSuccess message={t(data.message as any)} />
        )}
        <SubmitButton
          className="mt-4 w-full"
          label={t("submitLabel")}
          isPending={isPending}
        />
      </form>
    </Form>
  );
};

export default ContactUsForm;
