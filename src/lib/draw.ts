import { Draw } from "./../types/draw.d";

type DrawLineProps = Draw & {
  lineWidth: number;
};

export const drawLine = ({
  prevPoint,
  currentPoint,
  ctx,
  lineWidth = 5,
}: DrawLineProps) => {
  const { x: currX, y: currY } = currentPoint;
  const color = "rgba(59, 130, 246, 0.2)";

  let startPoint = prevPoint ?? currentPoint;

  ctx.globalCompositeOperation = "source-over";
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.2;

  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currX, currY);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(startPoint.x, startPoint.y, ctx.lineWidth / 2, 0, 2 * Math.PI);
  ctx.fill();
};
