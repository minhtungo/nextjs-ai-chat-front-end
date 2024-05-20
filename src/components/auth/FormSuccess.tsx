import { Check } from "lucide-react";
import { FC } from "react";

interface FormSuccessProps {
  message: string;
}

const FormSuccess: FC<FormSuccessProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-green-500/15 p-2.5 text-sm text-green-600">
      <Check className="h-4 w-4" />
      {message}
    </div>
  );
};

export default FormSuccess;
