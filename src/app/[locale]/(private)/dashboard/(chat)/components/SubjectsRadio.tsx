"use client";

import Spinner from "@/components/Spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SUBJECTS, TSubject } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { chatStore } from "@/store/chat";
import { FC } from "react";

interface SubjectsRadioProps {
  className?: string;
  selectedSubject?: string;
  isPending?: boolean;
  subjectsList: TSubject[];
  onChange: (value: string) => void;
  size?: "default" | "lg";
}

const SubjectsRadio: FC<SubjectsRadioProps> = ({
  className,
  subjectsList,
  onChange,
  selectedSubject,
  size,
  isPending,
}) => {
  return (
    <RadioGroup
      value={selectedSubject}
      onValueChange={onChange}
      className={cn(className)}
      disabled={isPending}
    >
      {subjectsList.map((subject) => (
        <RadioGroupItem
          value={subject.value}
          key={`new-chat-subject-${subject.value}`}
          className={cn(
            "flex items-center gap-2 rounded-sm border border-input px-3 py-2 hover:border-primary/40 data-[state=checked]:border-primary",
            size === "lg" && "px-4 py-3",
          )}
        >
          <div className="w-full overflow-hidden text-ellipsis text-left">
            {subject.label}
          </div>
          {isPending && selectedSubject === subject.value && <Spinner />}
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
};

export default SubjectsRadio;
