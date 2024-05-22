"use client";

import { changeUserPassword } from "@/actions/settings";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { changeUserPasswordSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

interface ChangePasswordProps {}

const ChangePassword: FC<ChangePasswordProps> = () => {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const form = useForm<z.infer<typeof changeUserPasswordSchema>>({
    resolver: zodResolver(changeUserPasswordSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      confirmNewPassword: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof changeUserPasswordSchema>) => {
    startTransition(() => {
      changeUserPassword(values)
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
        <CardTitle className="text-xl">Đổi mật khẩu</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="w-full space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu hiện tại</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-end border-t py-3 sm:py-3">
            <SubmitButton
              isLoading={isPending}
              size="sm"
              label="Đổi mật khẩu"
            />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ChangePassword;
