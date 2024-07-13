"use client";

import { FC, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SUBJECTS } from "@/lib/constant";
import { chatStore } from "@/store/chat";

interface SubjectSelectionProps {}

const SubjectSelection: FC<SubjectSelectionProps> = () => {
  const {
    store: [{ subject }, setChat],
  } = chatStore();

  return (
    <>
      {subject}
      <RadioGroup
        value={subject}
        onValueChange={(value) =>
          setChat((prev) => ({ ...prev, subject: value }))
        }
      >
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
