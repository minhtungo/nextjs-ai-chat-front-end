import { FC } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface LineWidthSliderProps {
  setLineWidth: (value: number) => void;
}

const LineWidthSlider: FC<LineWidthSliderProps> = ({ setLineWidth }) => {
  return (
    <Slider
      defaultValue={[25]}
      onValueCommit={([value]) => setLineWidth(value)}
      min={5}
      max={50}
      step={1}
      className={cn("w-[160px]")}
    />
  );
};

export default LineWidthSlider;
