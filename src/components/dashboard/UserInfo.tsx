"use client";

import { FC, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ExtendedUser } from "@/types/next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { updateUserProfileSchema } from "@/lib/definitions";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface UserInfoProps {
  user: ExtendedUser;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof updateUserProfileSchema>>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user.name! || "",
    },
  });

  const onSubmit = (values: z.infer<typeof updateUserProfileSchema>) => {
    // startTransition(() => {
    //   signUpWithCredentials(values).then((data) => {
    //     if (data?.error) {
    //       setErrorMessage(data.error);
    //     } else if (data?.success) {
    //       setSuccessMessage(data.success);
    //     }
    //   });
    // });
  };

  return (
    <Card className="w-full">
      <CardHeader className="w-full">
        <CardTitle className="text-xl">Profile</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-end border-t py-3 sm:py-3">
        <Button size="sm">Lưu</Button>
      </CardFooter>
    </Card>
  );
};

export default UserInfo;
