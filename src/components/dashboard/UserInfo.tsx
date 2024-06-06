"use client";

import { updateUserProfile } from "@/actions/settings";
import {
  Form,
  FormControl,
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
import { LANGUAGES } from "@/lib/constant";
import { updateUserProfileSchema } from "@/lib/definitions";
import { ExtendedUser } from "@/types/next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UserSettings } from "@prisma/client";

interface UserInfoProps {
  user: ExtendedUser & {
    settings: UserSettings;
  };
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const form = useForm<z.infer<typeof updateUserProfileSchema>>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user.name! || undefined,
      language: user?.settings?.preferredLang || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof updateUserProfileSchema>) => {
    startTransition(() => {
      updateUserProfile(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          } else if (data?.success) {
            update();
            toast.success(data.success);
          }
        })
        .catch(() => {
          toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        });
    });
  };

  return (
    <Card className="w-full" noBorder>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="w-full space-y-4" noBorder>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input placeholder="Email" value={user.email!} disabled />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Họ và tên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
              <DatePickerDemo />
              <FormMessage />
            </FormItem> */}
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LANGUAGES.map((language) => (
                        <SelectItem
                          key={`user-preferred-${language}`}
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
          </CardContent>
          <CardFooter noBorder>
            <SubmitButton isLoading={isPending} size="sm" label="Lưu" />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default UserInfo;
