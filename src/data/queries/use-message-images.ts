import { getMessageImageQueryKey } from "@/lib/queryKey";
import { getMessageImagesUseCase } from "@/use-cases/chat";
import { useQueries } from "@tanstack/react-query";

export const useMessageImages = (urls: (string | undefined)[]) => {
  return useQueries({
    queries: (urls || []).map((url) => {
      const path = new URL(url!).pathname;
      return {
        queryKey: getMessageImageQueryKey(path),
        queryFn: () => getMessageImagesUseCase({ path }),
      };
    }),
  });
};
