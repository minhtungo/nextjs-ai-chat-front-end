"use client";

import { FC, useState } from "react";

import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import Typography from "@/components/ui/typography";
import { SUBJECTS } from "@/lib/constant";

interface SubjectsSelectionProps {}

const SubjectsSelection: FC<SubjectsSelectionProps> = () => {
  const [subjects, setSubjects] = useState<Option[]>([]);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-muted-foreground">
          Select your subjects
        </div>
        <div className="ml-auto text-sm font-medium text-muted-foreground">
          <span className="text-muted-foreground">(optional)</span>
        </div>
      </div>
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
    </>
  );
};

export default SubjectsSelection;
