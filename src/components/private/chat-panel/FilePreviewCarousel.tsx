import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FilePreviewCarousel({
  fileArray,
  imageRefs,
  handleCarouselChange,
}: {
  fileArray: string[];
  imageRefs: React.MutableRefObject<HTMLImageElement[]>;
  handleCarouselChange: (index: number) => void;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      handleCarouselChange(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {fileArray.map((url, index) => (
            <CarouselItem key={index}>
              <Image
                src={url}
                ref={(el) => (imageRefs.current[index] = el)}
                width={1024}
                height={1024}
                className="h-auto w-full object-cover"
                alt="Image"
              />
            </CarouselItem>
          ))}
        </CarouselContent>{" "}
      </Carousel>
      <div className="flex w-full items-center justify-center gap-x-2 py-2 text-center text-base text-muted-foreground">
        <button
          className="text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => api?.scrollPrev()}
          disabled={!api?.canScrollPrev()}
        >
          <ChevronLeft className="size-5" />
        </button>
        File {current} of {count}
        <button
          className="text-muted-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => api?.scrollNext()}
          disabled={!api?.canScrollNext()}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
