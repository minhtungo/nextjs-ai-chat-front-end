import { cn } from "@/lib/utils";
import { MessageCircleWarning } from "lucide-react";

interface FormErrorProps extends React.ComponentProps<"div"> {
  message: string;
}

const FormError = ({ message, className }: FormErrorProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center text-sm text-red-500 dark:text-red-400",
        className,
      )}
    >
      <MessageCircleWarning className="h-5 w-5" />
      {message}
    </div>
  );
};

export default FormError;
