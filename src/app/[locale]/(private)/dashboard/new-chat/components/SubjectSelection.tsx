"use client";

import { FC, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SUBJECTS } from "@/lib/constant";

interface SubjectSelectionProps {}

const SubjectSelection: FC<SubjectSelectionProps> = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  return (
    <>
      {selectedSubject}
      <RadioGroup value={selectedSubject} onValueChange={setSelectedSubject}>
        {SUBJECTS.map((subject) => (
          <RadioGroupItem
            value={subject.value}
            key={`new-chat-subject-${subject.value}`}
            className="rounded-sm border border-input px-4 py-3 hover:border-primary/40 data-[state=checked]:border-primary"
          >
            {subject.label}
          </RadioGroupItem>
        ))}
      </RadioGroup>
    </>
  );
};

export default SubjectSelection;
