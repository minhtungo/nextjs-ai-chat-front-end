"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TSubject } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { FC, useRef } from "react";

interface SubjectsRadioProps {
  className?: string;
  selectedSubject?: string;
  setSelectedSubject: (value: string) => void;
  isPending?: boolean;
  subjectsList: TSubject[];
}

const SubjectsRadio: FC<SubjectsRadioProps> = ({
  className,
  subjectsList,
  selectedSubject,
  setSelectedSubject,
  isPending,
}) => {
  const otherRef = useRef<HTMLInputElement>(null);

  return (
    <RadioGroup
      value={selectedSubject}
      onValueChange={(value) => {
        console.log("otherSubjectRef", otherRef?.current?.value);
        console.log("value", value);
        setSelectedSubject(value);
      }}
      className={cn(className)}
      disabled={isPending}
    >
      {subjectsList.map((subject) => (
        <RadioGroupItem
          value={subject.value}
          key={`new-chat-subject-radio-${subject.value}`}
          className="flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/20 px-6 py-4 hover:border-primary/60 data-[state=checked]:border-primary"
        >
          <div className="w-full overflow-hidden text-ellipsis text-left">
            {subject.label}
          </div>
        </RadioGroupItem>
      ))}
      <RadioGroupItem
        value={otherRef?.current?.value || "Other"}
        key="new-chat-subject-radio-other"
        className="flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/20 px-6 py-4 hover:border-primary/60 data-[state=checked]:border-primary"
      >
        <span>Other:</span>
        <input
          ref={otherRef}
          onChange={(e) => setSelectedSubject(e.target.value)}
          type="text"
          className="flex-1 border-b focus-visible:border-b-primary focus-visible:outline-none"
        />
      </RadioGroupItem>
    </RadioGroup>
  );
};

export default SubjectsRadio;
