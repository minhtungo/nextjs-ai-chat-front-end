"use client";

import { updateUserSettingsAction } from "@/actions/user";
import { LANGUAGES } from "@/app-config";
import SubmitButton from "@/components/common/SubmitButton";
import { CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { updateUserSettingsSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";

interface UpdateSettingsFormProps {
  user: User;
}

const UpdateSettingsForm: FC<UpdateSettingsFormProps> = ({ user }) => {
  const { update } = useSession();
  const { isPending, execute } = useServerAction(updateUserSettingsAction);

  const form = useForm<z.infer<typeof updateUserSettingsSchema>>({
    resolver: zodResolver(updateUserSettingsSchema),
    defaultValues: {
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      preferredLang: user?.preferredLang.toLowerCase() || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateUserSettingsSchema>) => {
    console.log("values", values);
    const [_, err] = await execute(values);

    if (err) {
      toast.error(err.message);
      return;
    }
    update();
    toast.success("Cập nhật thành công");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="isTwoFactorEnabled"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Multi Factor Authentication
                </FormLabel>
                <FormDescription>
                  Require an extra security challenge when logging in.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  disabled={isPending}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="preferredLang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LANGUAGES.map((language, index) => (
                    <SelectItem
                      key={`user-preferred-${language}-${index}`}
                      value={language.locale}
                    >
                      {language.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <CardFooter className="w-full justify-end pt-3">
          <SubmitButton isPending={isPending} size="sm">
            Lưu thay đổi
          </SubmitButton>
        </CardFooter>
      </form>
    </Form>
  );
};

export default UpdateSettingsForm;
