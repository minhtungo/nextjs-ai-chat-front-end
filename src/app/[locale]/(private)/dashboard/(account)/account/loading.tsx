import Spinner from "@/components/common/Spinner";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner className="size-5" />
    </div>
  );
}
