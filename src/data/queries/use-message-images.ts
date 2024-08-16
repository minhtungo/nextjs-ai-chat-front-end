import { getMessageImageQueryKey } from "@/lib/query-keys";
import { getMessageImagesUseCase } from "@/use-cases/chat";
import { useQueries } from "@tanstack/react-query";

export const useMessageImages = (urls: string[]) => {
  return useQueries({
    queries: urls.map((url) => {
      return {
        queryKey: getMessageImageQueryKey(url),
        queryFn: () => getMessageImagesUseCase({ url }),
        staleTime: Infinity,
        enabled: !!url,
      };
    }),
  });
};
