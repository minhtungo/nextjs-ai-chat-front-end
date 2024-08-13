import convexHull from "convex-hull";
import { MutableRefObject } from "react";

interface useConvexHullProps {
  drawingPoints: MutableRefObject<[number, number][]>;
  selectedImage: HTMLImageElement;
}

export const useConvexHull = ({
  drawingPoints,
  selectedImage,
}: useConvexHullProps) => {
  if (drawingPoints.current.length < 3) return [];
  const originalWidth = selectedImage?.naturalWidth;
  const originalHeight = selectedImage?.naturalHeight;
  const renderedWidth = selectedImage?.width;
  const renderedHeight = selectedImage?.height;

  const scaleX = originalWidth / renderedWidth;
  const scaleY = originalHeight / renderedHeight;

  console.log("scaleX", scaleX);
  console.log("scaleY", scaleY);

  const scaledPoints = drawingPoints.current.map(([x, y]) => [
    x * scaleX,
    y * scaleY,
  ]);

  console.log("scaledPoints", scaledPoints);
  console.log("originalPoints", drawingPoints.current);

  const renderedHull = convexHull(drawingPoints.current) as Array<
    [number, number]
  >;
  const scaledHull = convexHull(scaledPoints) as Array<[number, number]>;

  console.log("test get hull", {
    renderedWidth,
    renderedHeight,
    renderedHull,
    originalWidth,
    originalHeight,
    scaledHull,
  });

  return {
    renderedWidth,
    renderedHeight,
    renderedHull,
    originalWidth,
    originalHeight,
    scaledHull,
  };
};
