import { Draw, Point } from "./../types/draw.d";
import { useEffect, useRef, useState, useCallback } from "react";
import convexHull from "convex-hull";

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void,
) => {
  const [mouseDown, setMouseDown] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);
  const points = useRef<number[][]>([]);

  const onMouseDown = () => setMouseDown(true);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.current = [];
  };

  const exportDrawingAsBlob = useCallback(
    (callback: (blob: Blob | null) => void) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.toBlob((blob) => {
        callback(blob);
      }, "image/png");
    },
    [],
  );

  const exportDrawingAsDataURL = useCallback(() => {
    const canvas = canvasRef.current;
    return canvas ? canvas.toDataURL("image/png") : null;
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;
      const currentPoint = computePointInCanvas(e);

      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
      points.current.push([currentPoint.x, currentPoint.y]);
    };

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
      prevPoint.current = null;
    };

    // Add event listeners
    canvasRef.current?.addEventListener("mousemove", handler);
    window.addEventListener("mouseup", mouseUpHandler);

    // Remove event listeners
    return () => {
      canvasRef.current?.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [onDraw]);

  const getConvexHull = () => {
    if (points.current.length < 3) return [];
    return convexHull(points.current);
  };

  return {
    canvasRef,
    onMouseDown,
    clear,
    exportDrawingAsBlob,
    exportDrawingAsDataURL,
    getConvexHull,
  };
};
