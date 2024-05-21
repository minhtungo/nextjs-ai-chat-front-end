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
import { updateUserProfileSchema } from "@/lib/definitions";
import { ExtendedUser } from "@/types/next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";

interface UserInfoProps {
  user: ExtendedUser;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const form = useForm<z.infer<typeof updateUserProfileSchema>>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user.name! || undefined,
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
    <Card className="w-full">
      <CardHeader className="w-full">
        <CardTitle className="text-xl">Profile</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="w-full space-y-4">
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
          </CardContent>
          <CardFooter className="justify-end border-t py-3 sm:py-3">
            <SubmitButton isLoading={isPending} size="sm" label="Lưu" />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default UserInfo;
