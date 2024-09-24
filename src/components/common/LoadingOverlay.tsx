import OverlayWindow from "@/components/common/OverlayWindow";
import Spinner from "@/components/common/Spinner";

const LoadingOverlay = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <OverlayWindow
      containerClassName="bg-accent/40"
      className="flex h-full w-full items-center justify-center"
    >
      <Spinner className="size-5 sm:size-6" />
    </OverlayWindow>
  );
};

export default LoadingOverlay;
