"use client";

import Spinner from "@/components/common/Spinner";
import { useMessage } from "@/features/chat/store/use-message";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const MathKeyboard = dynamic(() => import("./MathKeyboard"), {
  loading: () => (
    <div className="w-full text-center">
      <Spinner />
    </div>
  ),
  ssr: false,
});

interface MathKeyboardContainerProps extends React.ComponentProps<"div"> {
  formRef: React.RefObject<HTMLFormElement>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const MathKeyboardContainer = ({
  className,
  formRef,
  inputRef,
}: MathKeyboardContainerProps) => {
  const { mathMode, setMathMode } = useMessage();

  return (
    <div
      className={cn(className, "relative")}
      data-state={mathMode ? "open" : "closed"}
    >
      {mathMode && (
        <>
          <MathKeyboard formRef={formRef} inputRef={inputRef} />
          <button
            className="absolute -top-[10px] left-1/2 z-[1000] mb-4 size-5 rounded-full bg-accent p-1"
            onClick={() => setMathMode((prev) => !prev)}
          >
            <ChevronDown className="size-3" />
          </button>
        </>
      )}
      <div className="w-full" id="math-keyboard" />
    </div>
  );
};

export default MathKeyboardContainer;
