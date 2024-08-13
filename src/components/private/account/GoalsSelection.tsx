"use client";

import MultipleSelect from "@/components/private/common/MultipleSelect";
import { GOAlS } from "@/lib/constant";
import { Option } from "@/types/global";
import { FC, useState } from "react";

interface GoalsSelectionProps {}

const GoalsSelection: FC<GoalsSelectionProps> = () => {
  const [goals, setGoals] = useState<Option[]>([]);
  return (
    <MultipleSelect
      options={GOAlS}
      selectedOptions={goals}
      onChange={setGoals}
    />
  );
};

export default GoalsSelection;
