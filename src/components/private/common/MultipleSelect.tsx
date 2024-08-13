import { cn } from "@/lib/utils";
import { Option } from "@/types/global";
import { FC, useState } from "react";

interface MultipleSelectProps {
  options: Option[];
  className?: string;
  selectedOptions: Option[];
  onChange: (options: Option[]) => void;
}

const MultipleSelect: FC<MultipleSelectProps> = ({
  options,
  className,
  selectedOptions,
  onChange,
}) => {
  const onSelected = (option: Option) => {
    if (selectedOptions.find((s) => s.value === option.value)) {
      onChange(selectedOptions.filter((s) => s.value !== option.value));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {options.map(({ label, value }) => (
        <div
          key={value}
          className={cn(
            "cursor-pointer rounded-lg border border-border/60 bg-accent/20 px-6 py-4 hover:border-primary/60 data-[state=checked]:border-primary",
            selectedOptions.find((s) => s.value === value) && "border-primary",
          )}
          onClick={() =>
            onSelected({
              label,
              value,
            })
          }
        >
          <div className="w-full overflow-hidden text-ellipsis text-left">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MultipleSelect;
