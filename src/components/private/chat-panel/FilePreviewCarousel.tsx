import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function FilePreviewCarousel({
  fileArray,
  imageRefs,
  handleCarouselChange,
}: {
  fileArray: string[];
  imageRefs: React.MutableRefObject<HTMLImageElement[]>;
  handleCarouselChange: (index: number) => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
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
