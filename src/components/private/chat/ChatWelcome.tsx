import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import BotAvatar from "@/components/private/chat/BotAvatar";
import PromptHints from "@/components/private/chat/PromptHints";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface ChatWelcomeProps {
  className?: string;
}

const ChatWelcome: FC<ChatWelcomeProps> = ({ className }) => {
  return (
    <MaxWidthWrapper
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2",
        className,
      )}
    >
      <BotAvatar />
      <Typography variant="h3" tag="h2">
        How can I help you today?
      </Typography>
      <PromptHints className="mt-4" />
    </MaxWidthWrapper>
  );
};

export default ChatWelcome;
