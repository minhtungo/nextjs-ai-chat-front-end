import { MessageCircleWarning } from "lucide-react";
import { FC } from "react";

interface FormErrorProps {
  message: string;
}

const FormError: FC<FormErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-2.5 text-sm text-destructive">
      <MessageCircleWarning className="h-4 w-4" />
      {message}
    </div>
  );
};

export default FormError;
