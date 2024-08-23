"use client";

import { changeUserPasswordAction } from "@/actions/user";
import PasswordInput from "@/components/common/PasswordInput";
import SubmitButton from "@/components/common/SubmitButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import { changeUserPasswordSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useServerAction } from "zsa-react";

const ChangePassword = () => {
  const { isPending, execute } = useServerAction(changeUserPasswordAction);
  const { update } = useSession();

  const form = useForm<z.infer<typeof changeUserPasswordSchema>>({
    resolver: zodResolver(changeUserPasswordSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      confirmNewPassword: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof changeUserPasswordSchema>) => {
    const [_, err] = await execute(values);

    if (err) {
      toast.error(err.message);
      return;
    }
    update();
    form.reset();
    toast.success("Thay đổi mật khẩu thành công");
  };

  return (
    <Card className="w-full" noBorderMobile>
      <CardHeader className="w-full">
        <Typography variant="h5" tag="h3">
          Đổi mật khẩu
        </Typography>
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
                    <PasswordInput {...field} />
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
                    <PasswordInput {...field} />
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
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <SubmitButton isPending={isPending} size="sm">
              Đổi mật khẩu
            </SubmitButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ChangePassword;
