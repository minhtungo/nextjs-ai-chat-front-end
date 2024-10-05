"use client";

import PromptSuggestions from "@/components/chat/PromptSuggestions";
import { Badge } from "@/components/ui/badge";
import { useMessage } from "@/hooks/use-message";

interface PromptInfoProps {
  userId: string;
}

const PromptInfo = ({ userId }: PromptInfoProps) => {
  const { inTokenLimit } = useMessage();

  return (
    <>
      <PromptSuggestions userId={userId} />
      {!inTokenLimit && (
        <Badge className="mb-3">
          <span className="text-xs">Exceeded token limit</span>
        </Badge>
      )}
    </>
  );
};

export default PromptInfo;
