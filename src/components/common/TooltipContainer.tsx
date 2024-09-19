import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipContainerProps {
  content: string;
  asChild?: boolean;
  children: React.ReactNode;
}

const TooltipContainer = ({
  content,
  asChild = true,
  children,
}: TooltipContainerProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipContainer;
