import {
  FC,
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const MaskEditorDefaults = {
  cursorSize: 10,
  maskOpacity: 0.75,
  maskColor: "#ffffff",
  maskBlendMode: "normal",
};

interface MaskEditorProps {
  canvasRef: MutableRefObject<HTMLCanvasElement | undefined>;
  cursorSize?: any;
  image: HTMLImageElement | null;
  maskColor?: string;
  maskBlendMode?: string;
  maskOpacity?: number;
  drawingPoints: Array<[number, number]>;
}

export const ImageMaskEditor: FC<MaskEditorProps> = ({
  image,
  canvasRef,
  cursorSize = MaskEditorDefaults.cursorSize,
  maskColor = MaskEditorDefaults.maskColor,
  maskBlendMode = MaskEditorDefaults.maskBlendMode,
  maskOpacity = MaskEditorDefaults.maskOpacity,
  drawingPoints,
}: MaskEditorProps) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const maskCanvas = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvas = useRef<HTMLCanvasElement | null>(null);

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [maskContext, setMaskContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [cursorContext, setCursorContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const [size, setSize] = useState<{ x: number; y: number }>({
    x: 256,
    y: 256,
  });

  useLayoutEffect(() => {
    if (canvas.current && !context) {
      const ctx = (canvas.current as HTMLCanvasElement).getContext("2d");
      setContext(ctx);
    }
  }, [canvas]);

  useLayoutEffect(() => {
    if (maskCanvas.current && !context) {
      const ctx = (maskCanvas.current as HTMLCanvasElement).getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, size.x, size.y);
      }
      setMaskContext(ctx);
    }
  }, [maskCanvas]);

  useLayoutEffect(() => {
    if (cursorCanvas.current && !context) {
      const ctx = (cursorCanvas.current as HTMLCanvasElement).getContext("2d");
      setCursorContext(ctx);
    }
  }, [cursorCanvas]);

  useEffect(() => {
    if (image && context) {
      setSize({ x: image.offsetWidth, y: image.offsetHeight });

      context?.drawImage(image, 0, 0);

      console.log(
        "overlay image offset",
        image.offsetWidth,
        image.offsetHeight,
      );
      console.log("overlay image original", image.width, image.height);
    }
  }, [image, context]);

  // Pass mask canvas up
  useLayoutEffect(() => {
    if (canvasRef && canvasRef.current !== null) {
      canvasRef.current = maskCanvas.current!;
    }
  }, [maskCanvas]);

  useEffect(() => {
    const handleMouseMove = (evt: MouseEvent) => {
      if (cursorContext) {
        cursorContext.clearRect(0, 0, size.x, size.y);
        cursorContext.beginPath();
        cursorContext.fillStyle = `${maskColor}88`;
        cursorContext.strokeStyle = maskColor;
        cursorContext.arc(evt.offsetX, evt.offsetY, cursorSize, 0, 360);
        cursorContext.fill();
        cursorContext.stroke();
      }
      if (maskContext && evt.buttons === 1) {
        const x = evt.offsetX;
        const y = evt.offsetY;
        maskContext.beginPath();
        maskContext.fillStyle = maskColor;
        maskContext.arc(x, y, cursorSize, 0, 360);
        maskContext.fill();

        drawingPoints.push([x, y]);
      }
    };

    cursorCanvas.current?.addEventListener("mousemove", handleMouseMove);

    return () => {
      cursorCanvas.current?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorContext, maskContext, cursorCanvas, cursorSize, maskColor, size]);

  return (
    <div className="mask-editor-outer">
      <div
        className="mask-editor-inner"
        style={{
          width: size.x,
          height: size.y,
        }}
      >
        <canvas
          ref={canvas}
          style={{
            width: size.x,
            height: size.y,
          }}
          width={size.x}
          height={size.y}
          className="mask-editor-base-canvas"
        />
        <canvas
          ref={maskCanvas}
          width={size.x}
          height={size.y}
          style={{
            width: size.x,
            height: size.y,
            opacity: maskOpacity,
            mixBlendMode: maskBlendMode as any,
          }}
          className="mask-editor-mask-canvas"
        />
        <canvas
          ref={cursorCanvas}
          width={size.x}
          height={size.y}
          style={{
            width: size.x,
            height: size.y,
          }}
          className="mask-editor-cursor-canvas"
        />
      </div>
    </div>
  );
};
