import { cn } from "@/lib/utils";
import { Option } from "@/types/global";
import { FC, useState } from "react";

interface MultipleSelectProps {
  defaultOptions: Option[];
  className?: string;
  onChange: (options: Option[]) => void;
}

const MultipleSelect: FC<MultipleSelectProps> = ({
  defaultOptions,
  className,
  onChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const onSelected = (option: Option) => {
    if (selectedOptions.find((s) => s.value === option.value)) {
      setSelectedOptions(
        selectedOptions.filter((s) => s.value !== option.value),
      );
      onChange(selectedOptions.filter((s) => s.value !== option.value));
    } else {
      setSelectedOptions([...selectedOptions, option]);
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className={cn("grid grid-cols-1 gap-3", className)}>
      {defaultOptions.map(({ label, value }) => (
        <div
          key={value}
          className={cn(
            "cursor-pointer rounded-lg border border-border/60 bg-accent/20 px-4 py-3 hover:border-primary/60 data-[state=checked]:border-primary",
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
