"use client";

import { useDraw } from "@/hooks/use-draw";
import { drawLine } from "@/lib/draw";
import { useEffect } from "react";

const ImageMasker = ({ imageSrc }: { imageSrc: string }) => {
  const { canvasRef, onMouseDown, clear } = useDraw(
    ({ prevPoint, currentPoint, ctx }) => {
      drawLine({
        prevPoint,
        currentPoint,
        ctx,
        color: "#000",
      });
    },
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
    };

    return () => {};
  }, [canvasRef]);

  return <canvas ref={canvasRef} onMouseDown={onMouseDown} />;
};

export default ImageMasker;
