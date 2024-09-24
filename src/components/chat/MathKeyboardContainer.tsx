"use client";

import { useMessage } from "@/hooks/use-message";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const MathKeyboard = dynamic(() => import("./MathKeyboard"), {
  loading: () => <p>Loading...</p>,
});

interface MathKeyboardContainerProps extends React.ComponentProps<"div"> {
  formRef: React.RefObject<HTMLFormElement>;
}

const MathKeyboardContainer = ({
  className,
  formRef,
}: MathKeyboardContainerProps) => {
  const { mathMode, setMathMode } = useMessage();

  return (
    <div
      className={cn(className, "relative")}
      data-state={mathMode ? "open" : "closed"}
    >
      {mathMode && <MathKeyboard formRef={formRef} />}
      {mathMode && (
        <button
          className="absolute -top-[10px] left-1/2 z-[1000] mb-4 size-5 rounded-full bg-accent p-1"
          onClick={() => setMathMode((prev) => !prev)}
        >
          <ChevronDown className="size-3" />
        </button>
      )}
      <div className="w-full" id="math-keyboard" />
    </div>
  );
};

export default MathKeyboardContainer;
