"use client";

import { changeUserPasswordAction } from "@/actions/settings";
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
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import PasswordInput from "../auth/PasswordInput";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Typography from "../ui/typography";
import { useServerAction } from "zsa-react";

interface ChangePasswordProps {}

const ChangePassword: FC<ChangePasswordProps> = () => {
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
    <Card className="w-full" noBorder>
      <CardHeader className="w-full" noBorder>
        <Typography variant="h5" tag="h3">
          Đổi mật khẩu
        </Typography>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="w-full space-y-4" noBorder>
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
          <CardFooter noBorder>
            <SubmitButton
              isPending={isPending}
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
