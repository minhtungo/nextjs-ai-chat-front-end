"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { sendUserMailAction } from "@/actions/mail";
import SubmitButton from "@/components/common/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { feedbackFormSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import FormSuccess from "@/features/auth/components/FormSuccess";
import FormError from "@/features/auth/components/FormError";

const FeedbackForm = () => {
  const { isPending, execute, data, error } =
    useServerAction(sendUserMailAction);

  const t = useTranslations("form.Feedback");

  const form = useForm<z.infer<typeof feedbackFormSchema>>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      subject: "",
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof feedbackFormSchema>) => {
    await execute(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("subject")}</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("content")}</FormLabel>
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
        <SubmitButton isPending={isPending} className="ml-auto mt-6">
          {t("submitLabel")}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default FeedbackForm;
