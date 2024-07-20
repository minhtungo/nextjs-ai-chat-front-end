"use client";

import Spinner from "@/components/common/Spinner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TSubject } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface SubjectsRadioProps {
  className?: string;
  selectedSubject?: string;
  setSelectedSubject: (value: string) => void;
  isPending?: boolean;
  subjectsList: TSubject[];
  size?: "default" | "lg";
}

const SubjectsRadio: FC<SubjectsRadioProps> = ({
  className,
  subjectsList,
  selectedSubject,
  setSelectedSubject,
  size,
  isPending,
}) => {
  return (
    <RadioGroup
      value={selectedSubject}
      onValueChange={setSelectedSubject}
      className={cn(className)}
      disabled={isPending}
    >
      {subjectsList.map((subject) => (
        <RadioGroupItem
          value={subject.value}
          key={`new-chat-subject-${subject.value}`}
          className={cn(
            "flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/20 px-4 py-2 hover:border-primary/60 data-[state=checked]:border-primary",
            size === "lg" && "px-4 py-3",
          )}
        >
          <div className="w-full overflow-hidden text-ellipsis text-left text-sm">
            {subject.label}
          </div>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
};

export default SubjectsRadio;
