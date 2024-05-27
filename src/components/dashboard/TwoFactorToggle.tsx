"use client";

import { toggleTwoFactor, updateUserProfile } from "@/actions/settings";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { twoFactorToggleSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { FC, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import { Switch } from "../ui/switch";

interface TwoFactorToggleProps {
  isTwoFactorEnabled: boolean;
}

const TwoFactorToggle: FC<TwoFactorToggleProps> = ({ isTwoFactorEnabled }) => {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();

  const form = useForm<z.infer<typeof twoFactorToggleSchema>>({
    resolver: zodResolver(twoFactorToggleSchema),
    defaultValues: {
      isTwoFactorEnabled: isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof twoFactorToggleSchema>) => {
    startTransition(() => {
      toggleTwoFactor(values)
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
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
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
          </CardContent>
          <CardFooter noBorder>
            <SubmitButton isLoading={isPending} size="sm" label="Lưu" />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default TwoFactorToggle;
