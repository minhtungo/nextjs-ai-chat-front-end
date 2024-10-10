"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateUserAction } from "@/features/account/actions";
import SubmitButton from "@/components/common/SubmitButton";
import { ACADEMIC_LEVELS } from "@/lib/constant";
import { updateUserProfileSchema } from "@/features/account/schemas";
import { UserProfileProps } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";

interface UserProfileFormProps {
  user: UserProfileProps;
}

const UserProfileForm: FC<UserProfileFormProps> = ({ user }) => {
  // const [subjects, setSubjects] = useState<Option[]>(
  //   user.subjects?.length > 0
  //     ? user.subjects?.map((subject) => {
  //         return {
  //           value: subject,
  //           label: getSubjectLabelFromValue(subject),
  //         };
  //       })
  //     : [],
  // );
  const [file, setFile] = useState<File | undefined>(undefined);

  const { isPending, execute } = useServerAction(updateUserAction);
  const form = useForm<z.infer<typeof updateUserProfileSchema>>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      name: user.name! || undefined,
      image: user.image || undefined,
      academicLevel: user.academicLevel || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof updateUserProfileSchema>) => {
    // values.subjects = subjects?.map((subject) => subject.value) || [];

    const [_, err] = await execute(values);

    if (err) {
      toast.error(err.message);
      return;
    }

    setFile(undefined);
    toast.success("Cập nhật thành công");
  };

  return (
    <Card className="w-full" noBorderMobile>
      <CardTitle className="mb-6">Profile</CardTitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="w-full space-y-4">
            <div className="mb-6 w-fit">
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id="attach-profile-image"
                onChange={(e) => {
                  if (e.target.files?.length) {
                    setFile(e.target?.files[0]);
                  }
                }}
              />
              <label htmlFor="attach-profile-image" className="cursor-pointer">
                <Avatar className="size-16 border sm:size-24">
                  <div className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-card/60 opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                    <Camera className="size-4" />
                  </div>
                  <AvatarImage
                    src={
                      (file && URL.createObjectURL(file)) || user?.image || ""
                    }
                    alt={`${user?.name}-avatar`}
                  />
                  <AvatarFallback className="text-lg sm:text-xl">
                    {user?.name ? user.name.split(" ").pop()?.charAt(0) : "G"}
                  </AvatarFallback>
                </Avatar>
              </label>
              <span className="sr-only">Attach Image</span>
            </div>

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
            <FormField
              control={form.control}
              name="academicLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your grade level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ACADEMIC_LEVELS.map((level) => (
                        <SelectItem
                          key={`user-grade-${level.value}`}
                          value={level.value}
                        >
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className="space-y-2">
              <Label>Subjects</Label>
              <MultipleSelector
                defaultOptions={SUBJECTS}
                value={subjects}
                onChange={setSubjects}
                placeholder="Select subjects"
                hidePlaceholderWhenSelected
                hideClearAllButton
                emptyIndicator={
                  <Typography className="text-muted-foreground">
                    no results found.
                  </Typography>
                }
              />
            </div> */}
          </CardContent>
          <CardFooter className="justify-end pt-3">
            <SubmitButton isPending={isPending} size="sm">
              Lưu thay đổi
            </SubmitButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default UserProfileForm;
