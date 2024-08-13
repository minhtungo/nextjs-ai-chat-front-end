"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TSubject } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { FC, useRef } from "react";

interface OptionsRadioProps {
  className?: string;
  selectedOption?: string;
  setSelectedOption: (value: string) => void;
  isPending?: boolean;
  list: {
    label: string;
    value: string;
  }[];
}

const OptionsRadio: FC<OptionsRadioProps> = ({
  className,
  list,
  selectedOption,
  setSelectedOption,
  isPending,
}) => {
  const otherRef = useRef<HTMLInputElement>(null);

  return (
    <RadioGroup
      value={selectedOption}
      onValueChange={(value) => {
        setSelectedOption(value);
      }}
      className={cn(className)}
      disabled={isPending}
    >
      {list.map((item) => (
        <RadioGroupItem
          value={item.value}
          key={`new-chat-subject-radio-${item.value}`}
          className="rounded-lg border border-border/60 bg-accent/20 px-6 py-4 hover:border-primary/60 data-[state=checked]:border-primary"
        >
          <div className="w-full overflow-hidden text-ellipsis text-left">
            {item.label}
          </div>
        </RadioGroupItem>
      ))}
      <RadioGroupItem
        value={otherRef?.current?.value || "Other"}
        key="new-chat-subject-radio-other"
        className="flex items-center gap-2 rounded-lg border border-border/60 bg-accent/20 px-6 py-4 hover:border-primary/60 data-[state=checked]:border-primary"
      >
        <span>Other:</span>
        <input
          ref={otherRef}
          onChange={(e) => setSelectedOption(e.target.value)}
          type="text"
          className="flex-1 border-b focus-visible:border-b-primary focus-visible:outline-none"
        />
      </RadioGroupItem>
    </RadioGroup>
  );
};

export default OptionsRadio;
