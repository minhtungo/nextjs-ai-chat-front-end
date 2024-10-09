"use client";

import { RefObject, useEffect } from "react";

const ImageMasker = ({
  onMouseDown,
  canvasRef,
  image,
}: {
  onMouseDown: () => void;
  canvasRef: RefObject<HTMLCanvasElement>;
  image: HTMLImageElement | null;
}) => {
  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas && image) {
      canvas.width = image.offsetWidth;
      canvas.height = image.offsetHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    return () => {};
  }, [canvasRef]);

  return <canvas ref={canvasRef} onMouseDown={onMouseDown} />;
};

export default ImageMasker;
