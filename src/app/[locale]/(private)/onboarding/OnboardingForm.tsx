"use client";

import { onboardingFormAction } from "@/actions/settings";
import SubmitButton from "@/components/SubmitButton";
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

import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import Typography from "@/components/ui/typography";
import { ACADEMIC_LEVELS, SUBJECTS } from "@/lib/constant";
import { onboardingFormSchema } from "@/lib/definitions";
import { PROTECTED_BASE_URL } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";

interface OnboardingFormProps {
  user: User;
}

const OnboardingForm: FC<OnboardingFormProps> = ({ user }) => {
  const [subjects, setSubjects] = useState<Option[]>([]);

  const { isPending, execute } = useServerAction(onboardingFormAction);

  // const { update } = useSession();s

  const form = useForm<z.infer<typeof onboardingFormSchema>>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      academicLevel: undefined,
      subjects: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof onboardingFormSchema>) => {
    values.subjects = subjects?.map((subject) => subject.value) || [];

    const [_, err] = await execute(values);

    if (err) {
      toast.error(err.message);
      return;
    }

    // update();
    window.history.replaceState({}, "", `${PROTECTED_BASE_URL}`);
  };

  return (
    <Card className="w-full" noBorder>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="w-full space-y-4" noBorder>
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
          <CardFooter noBorder>
            <SubmitButton isLoading={isPending} size="sm" label="Lưu" />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default OnboardingForm;
