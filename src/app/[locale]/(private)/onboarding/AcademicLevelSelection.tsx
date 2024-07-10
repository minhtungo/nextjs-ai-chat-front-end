import { FC } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACADEMIC_LEVELS } from "@/lib/constant";

interface AcademicLevelSelectionProps {}

const AcademicLevelSelection: FC<AcademicLevelSelectionProps> = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-muted-foreground">
          Select your academic level
        </div>
        <div className="ml-auto text-sm font-medium text-muted-foreground">
          <span className="text-muted-foreground">(optional)</span>
        </div>
      </div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select your academic level" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {ACADEMIC_LEVELS.map((level) => (
              <SelectItem
                key={`academic-level-${level.value}`}
                value={level.value}
              >
                {level.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default AcademicLevelSelection;
