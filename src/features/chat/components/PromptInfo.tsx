"use client";

import PromptSuggestions from "@/features/chat/components/PromptSuggestions";
import { Badge } from "@/components/ui/badge";
import { useMessage } from "@/features/chat/store/use-message";

const PromptInfo = () => {
  const { inTokenLimit } = useMessage();

  return (
    <>
      <PromptSuggestions />
      {!inTokenLimit && (
        <Badge className="mb-3">
          <span className="text-xs">Exceeded token limit</span>
        </Badge>
      )}
    </>
  );
};

export default PromptInfo;
