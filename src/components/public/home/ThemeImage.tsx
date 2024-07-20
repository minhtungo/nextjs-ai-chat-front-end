"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { FC } from "react";

type Props = Omit<ImageProps, "src" | "priority" | "loading"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage: FC<Props> = (props) => {
  const { srcLight, srcDark, alt, className, ...rest } = props;
  return (
    <>
      <Image
        {...rest}
        src={srcLight}
        className={cn("dark:hidden", className)}
        alt={alt}
      />
      <Image
        {...rest}
        src={srcDark}
        className={cn("hidden dark:block", className)}
        alt={alt}
      />
    </>
  );
};

export default ThemeImage;
