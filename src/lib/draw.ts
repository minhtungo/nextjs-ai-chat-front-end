import { Draw } from "./../types/draw.d";

type DrawLineProps = Draw & {
  color: string;
  lineWidth: number;
};

export const drawLine = ({
  prevPoint,
  currentPoint,
  ctx,
  lineWidth = 5,
}: DrawLineProps) => {
  const { x: currX, y: currY } = currentPoint;
  const lineColor = "rgba(59, 130, 246 , 0.2)";

  let startPoint = prevPoint ?? currentPoint;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currX, currY);
  ctx.stroke();

  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(startPoint.x, startPoint.y, ctx.lineWidth / 2, 0, 2 * Math.PI);
  ctx.fill();
};
