"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

type ThemeImageProps = Omit<ImageProps, "src" | "priority" | "loading"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: ThemeImageProps) => {
  const { srcLight, srcDark, alt, className, ...rest } = props;
  return (
    <>
      {/* <Image
        {...rest}
        src={srcLight}
        className={cn("dark:hidden", className)}
        fetchPriority="high"
        alt={alt}
      /> */}
      <Image
        {...rest}
        src={srcDark}
        priority={true}
        className={cn(className)}
        alt={alt}
      />
    </>
  );
};

export default ThemeImage;
