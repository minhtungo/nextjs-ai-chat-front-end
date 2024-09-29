import Typography from "@/components/ui/typography";
import { TIntroBlock } from "@/content/landing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC } from "react";

interface IntroBlockProps {
  intro: TIntroBlock;
}

const IntroBlock: FC<IntroBlockProps> = ({
  intro: { title, description, imageSrc, width, height, isOrderEven },
}) => {
  return (
    <div className="grid gap-x-16 gap-y-8 lg:grid-cols-2 lg:items-start">
      <div
        className={cn(
          "mt-1 space-y-4 whitespace-pre-line",
          isOrderEven && "lg:order-1",
        )}
      >
        <Typography variant="h3" tag="h2" data-aos="fade-up">
          {title}
        </Typography>
        <Typography
          variant="p"
          className="text-muted-foreground"
          data-aos="fade-up"
        >
          {description}
        </Typography>
      </div>

      <Image
        src={imageSrc}
        width={width}
        height={height}
        alt="Instant chat with AI Tutor"
        className="rounded-lg border shadow"
        data-aos="fade-up"
      />
    </div>
  );
};

export default IntroBlock;
