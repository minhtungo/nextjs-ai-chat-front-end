import { CheckCircle } from "lucide-react";
import { FC } from "react";

interface FormSuccessProps {
  message: string;
}

const FormSuccess: FC<FormSuccessProps> = ({ message }) => {
  return (
    <div className="flex items-start gap-x-2 rounded-md bg-green-500/15 p-2.5 text-sm text-green-600">
      <CheckCircle className="h-5 w-5" />
      {message}
    </div>
  );
};

export default FormSuccess;
