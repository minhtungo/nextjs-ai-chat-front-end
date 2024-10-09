import PromptHints from "@/features/chat/components/PromptHints";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface EmptyChatScreenProps extends React.ComponentProps<"div"> {
  userId: string;
}

const EmptyChatScreen = ({ className, userId }: EmptyChatScreenProps) => {
  return (
    <MaxWidthWrapper
      className={cn(
        "flex w-full max-w-5xl flex-col items-center justify-center gap-2",
        className,
      )}
    >
      <Typography variant="h3" tag="h2" className="text-center">
        How can I help you today?
      </Typography>
      <PromptHints className="mt-4" userId={userId} />
    </MaxWidthWrapper>
  );
};

export default EmptyChatScreen;
