import Typography from "@/components/ui/typography";
import { TIntroBlock } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";

const IntroBlock: FC<TIntroBlock> = ({
  title,
  description,
  imageSrc,
  width,
  height,
  isOrderEven,
}) => {
  return (
    <div className="grid gap-x-16 gap-y-8 lg:grid-cols-2 lg:items-start">
      <div className={cn(isOrderEven && "lg:order-1")}>
        <Typography variant="h2" className="mb-3 sm:mb-4 xl:mt-4">
          {title}
        </Typography>
        <Typography variant="p" className="text-muted-foreground">
          {description}
        </Typography>
      </div>
      <Image
        src={imageSrc}
        width={width}
        height={height}
        alt="Instant chat with AI Tutor"
        className="rounded-lg shadow-sm"
      />
    </div>
  );
};

export default IntroBlock;
