"use client";

import { onboardingFormAction } from "@/actions/user";
import { chatUrl } from "@/app-config";
import Stepper from "@/components/common/Stepper";
import SubmitButton from "@/components/common/SubmitButton";
import MultipleSelect from "@/components/private/common/MultipleSelect";
import {
  MultiStepForm,
  MultiStepFormContextProvider,
} from "@/components/private/multistep-form/MultiStepForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MultipleSelector from "@/components/ui/multiple-selector";
import {
  MultiStepFormHeader,
  MultiStepFormStep,
} from "@/components/ui/multistep-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Typography from "@/components/ui/typography";
import { useMultiStepFormContext } from "@/hooks/use-multistep-form-context";
import {
  ACADEMIC_LEVELS,
  GOAlS,
  ONBOARDING_STEPS,
  SUBJECTS,
} from "@/lib/constant";
import { onboardingSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useServerAction } from "zsa-react";

type FormValues = z.infer<typeof onboardingSchema>;

const OnboardingFormHeader = () => {
  return (
    <MultiStepFormHeader className="mb-10 space-y-6">
      <h2 className="text-xl font-medium">
        Personalize your learning experience
      </h2>

      <MultiStepFormContextProvider>
        {({ currentStepIndex }) => (
          <Stepper
            steps={ONBOARDING_STEPS}
            currentStepIndex={currentStepIndex}
          />
        )}
      </MultiStepFormContextProvider>
    </MultiStepFormHeader>
  );
};

const OnBoardingFormSteps = () => {
  return (
    <MultiStepFormStep name="academic">
      <AcademicStep />
    </MultiStepFormStep>
  );
};

const OnboardingForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      academic: {
        level: "",
        subjects: [],
      },
      goals: {
        goals: [],
      },
    },
    reValidateMode: "onBlur",
    mode: "onBlur",
  });

  const { isPending, execute } = useServerAction(onboardingFormAction);

  const onSubmit = async (values: FormValues) => {
    const [data, err] = await execute(values);

    if (err) {
      toast.error(err.message);
      return;
    }

    if (data.success) {
      window.history.replaceState({}, "", chatUrl);
    }
  };

  return (
    <MultiStepForm
      className="space-y-10 p-8"
      schema={onboardingSchema}
      form={form}
      onSubmit={onSubmit}
      header={<OnboardingFormHeader />}
    >
      <MultiStepFormStep name="academic">
        <AcademicStep />
      </MultiStepFormStep>

      <MultiStepFormStep name="goals">
        <GoalsStep />
      </MultiStepFormStep>

      <MultiStepFormStep name="review">
        <ReviewStep isPending={isPending} />
      </MultiStepFormStep>
    </MultiStepForm>
  );
};

const AcademicStep = () => {
  const { form, nextStep, isStepValid } = useMultiStepFormContext();

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          name="academic.level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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

        <FormField
          name="academic.subjects"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subjects</FormLabel>
              <FormControl>
                <MultipleSelector
                  defaultOptions={SUBJECTS}
                  onChange={(options) =>
                    field.onChange(options.map((option) => option.value))
                  }
                  placeholder="Select subjects"
                  hidePlaceholderWhenSelected
                  hideClearAllButton
                  emptyIndicator={
                    <Typography className="text-muted-foreground">
                      no results found.
                    </Typography>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button onClick={nextStep} disabled={!isStepValid()}>
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
};

const GoalsStep = () => {
  const { form, prevStep, nextStep, isStepValid } = useMultiStepFormContext();

  return (
    <Form {...form}>
      <div className="space-y-6">
        <FormField
          name="goals.goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goals</FormLabel>
              <FormControl>
                <MultipleSelect
                  defaultOptions={GOAlS}
                  onChange={(goals) => {
                    field.onChange(goals.map((option) => option.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-x-2">
          <Button type={"button"} variant={"outline"} onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep} disabled={!isStepValid()}>
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
};

const ReviewStep = ({ isPending }: { isPending: boolean }) => {
  const { prevStep } = useMultiStepFormContext();

  return (
    <div className="flex flex-col items-center justify-center gap-y-6 text-center">
      <CheckCircle className="size-10 text-green-500" />
      <Typography variant="h4" tag="h1" className="">
        You're all set! You can now start using the app.🎉
      </Typography>
      <div className="mt-4 flex items-center gap-2">
        <Button type={"button"} variant={"outline"} onClick={prevStep}>
          Back
        </Button>
        <SubmitButton type="submit" isPending={isPending}>
          Finish <ChevronRight className="size-4" />
        </SubmitButton>
      </div>
    </div>
  );
};

export default OnboardingForm;
