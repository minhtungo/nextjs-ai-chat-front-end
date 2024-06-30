import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FC } from "react";
import { Card } from "../ui/card";
import CreateThreadSheet from "@/app/[locale]/(private)/dashboard/(chat)/CreateThreadSheet";

interface UserMessageProps {
  children: React.ReactNode;
}

const UserMessage: FC<UserMessageProps> = ({ children }) => {
  return (
    <div className="space-y-1.5">
      <Card className="ml-auto w-fit bg-secondary p-3 sm:px-4 sm:py-3">
        {children}
      </Card>
      <TooltipProvider delayDuration={100}>
        <div className="ml-auto items-center justify-end gap-[2px] text-right text-muted-foreground">
          <Tooltip>
            <TooltipTrigger asChild>
              <CreateThreadSheet message={children} />
            </TooltipTrigger>
            <TooltipContent side="bottom">Create thread</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default UserMessage;
