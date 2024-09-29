import { MessageCircleWarning } from "lucide-react";

interface FormErrorProps {
  message: string;
}

const FormError = ({ message }: FormErrorProps) => {
  return (
    <div className="flex items-start gap-x-2 rounded-md bg-destructive/80 p-2.5 text-sm text-destructive-foreground">
      <MessageCircleWarning className="h-5 w-5" />
      {message}
    </div>
  );
};

export default FormError;
