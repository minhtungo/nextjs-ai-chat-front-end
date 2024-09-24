import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";

interface SlidesNavProps {
  onNavigate: (index: number) => void;
  selectedIndex: number;
  total: number;
}

const SlidesNav: FC<SlidesNavProps> = ({
  onNavigate,
  selectedIndex,
  total,
}) => {
  return (
    <div className="flex h-14 w-full items-center justify-center gap-1 text-base text-muted-foreground">
      <button
        className="p-2 text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => {
          onNavigate(selectedIndex! - 1);
        }}
        disabled={selectedIndex === 0}
      >
        <ChevronLeft className="size-4" />
      </button>
      {selectedIndex! + 1} of {total}
      <button
        className="p-2 text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => {
          onNavigate(selectedIndex! + 1);
        }}
        disabled={selectedIndex === total - 1}
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
};

export default SlidesNav;
