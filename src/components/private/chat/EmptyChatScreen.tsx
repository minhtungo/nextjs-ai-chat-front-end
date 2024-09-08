import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import BotAvatar from "@/components/private/chat/BotAvatar";
import PromptHints from "@/components/private/chat/PromptHints";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface EmptyChatScreenProps {
  className?: string;
  userId: string;
}

const EmptyChatScreen: FC<EmptyChatScreenProps> = ({ className, userId }) => {
  return (
    <MaxWidthWrapper
      className={cn(
        "flex w-full max-w-5xl flex-col items-center justify-center gap-2",
        className,
      )}
    >
      <BotAvatar />
      <Typography variant="h4" tag="h2" className="text-center">
        How can I help you today?
      </Typography>
      <PromptHints className="mt-4" userId={userId} />
    </MaxWidthWrapper>
  );
};

export default EmptyChatScreen;
