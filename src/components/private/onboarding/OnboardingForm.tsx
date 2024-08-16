"use client";

import { onboardingFormAction } from "@/actions/user";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { buttonVariants } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import Typography from "@/components/ui/typography";
import { ACADEMIC_LEVELS, SUBJECTS } from "@/lib/constant";
import { onboardingFormSchema } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { PROTECTED_BASE_URL } from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ChevronRight } from "lucide-react";
import { User } from "next-auth";
import Link from "next/link";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import Logo from "@/components/common/Logo";
import SubmitButton from "@/components/common/SubmitButton";

interface OnboardingFormProps {
  user: User;
}

const OnboardingForm: FC<OnboardingFormProps> = () => {
  const [subjects, setSubjects] = useState<Option[]>([]);

  const { isPending, execute } = useServerAction(onboardingFormAction);
  const [isFinished, setIsFinished] = useState(false);

  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      academicLevel: undefined,
      subjects: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof onboardingFormSchema>) => {
    values.subjects = subjects?.map((subject) => subject.value) || [];

    const [data, err] = await execute(values);

    if (err) {
      toast.error(err.message);
      return;
    }

    if (data.success) {
      setIsFinished(true);
    }
  };

  return (
    <Card className="w-full max-w-7xl" noBorderMobile>
      {!isFinished ? (
        <>
          <Logo />
          <Typography variant="h2" tag="h1" className="mb-6 mt-2">
            Personalize your learning experience
          </Typography>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="w-full space-y-4">
                <FormField
                  control={form.control}
                  name="academicLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your academic level" />
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
                <div className="space-y-2">
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
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton
                  className="w-full"
                  isPending={isPending}
                  size="sm"
                >
                  Lưu thay đổi
                </SubmitButton>
              </CardFooter>
            </form>
          </Form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-6 text-center">
          <CheckCircle className="size-10 text-green-500" />
          <Typography variant="h4" tag="h1" className="">
            You're all set! You can now start using the app.🎉
          </Typography>
          <Link
            className={cn(buttonVariants({ variant: "outline" }), "mt-4")}
            href={PROTECTED_BASE_URL}
          >
            Continue to dashboard <ChevronRight className="size-4" />
          </Link>
        </div>
      )}
    </Card>
  );
};

export default OnboardingForm;
