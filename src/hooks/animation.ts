/* eslint-disable @typescript-eslint/no-explicit-any */
const useAnimationNet = (id: string, refFigure: any) => {
  const body = document.body as HTMLBodyElement;

  const rem = +window
    .getComputedStyle(document.body)
    .getPropertyValue("font-size")
    .slice(0, -2);

  const canvasHeight = refFigure.current.offsetHeight;
  const canvasWidth = refFigure.current.offsetWidth;
  const verticalLines = Math.floor(canvasWidth / rem);
  const horizontalLines = Math.floor(canvasHeight / rem);

  let canvas: HTMLCanvasElement | null = null;
  let ctx: any;

  const scale = window.devicePixelRatio;

  if (body.querySelectorAll(`#${id}`)?.length) {
    canvas = body.querySelector(`#${id}`) as HTMLCanvasElement;
    ctx = canvas.getContext("2d");

    if (devicePixelRatio >= 2) {
      // ctx?.scale(2, 2);
    }
  }

  if (!canvas) return;
  if (!ctx) return;

  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = Math.floor(canvasWidth * scale);
  canvas.height = Math.floor(canvasHeight * scale);
  ctx.scale(scale, scale);

  ctx.strokeStyle = "#11FF00";
  ctx.lineWidth = 0.05 * rem;

  ctx.imageSmoothingEnabled = false;

  let vertikalArr: { x: number; y: number }[][] = [];
  let horizontalArr: { x: number; y: number }[][] = [];

  const refreshVertikalArr = () => {
    vertikalArr = [];
    for (let i = 0; i < horizontalLines + 1; i++) {
      vertikalArr.push([
        { x: rem * i * scale, y: 0 },
        { x: rem * i * scale, y: 0 },
        { x: rem * i * scale, y: canvasHeight / 2 },
        { x: rem * i * scale, y: canvasHeight },
      ]);
    }
  };

  const refreshHorizontalArr = () => {
    horizontalArr = [];
    for (let i = 0; i < verticalLines + 1; i++) {
      horizontalArr.push([
        { x: 0, y: rem * i * scale },
        { x: 0, y: rem * i * scale },
        { x: canvasWidth / 2, y: rem * i * scale },
        { x: canvasWidth, y: rem * i * scale },
      ]);
    }
  };

  refreshVertikalArr();
  refreshHorizontalArr();

  function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    vertikalArr.forEach((el) => {
      ctx.beginPath();
      ctx.moveTo(el[0].x, 0);
      ctx.bezierCurveTo(el[1].x, el[1].y, el[2].x, el[2].y, el[3].x, el[3].y);
      ctx.stroke();
      ctx.closePath();
    });

    horizontalArr.forEach((el) => {
      ctx.beginPath();
      ctx.moveTo(0, el[0].y);
      ctx.bezierCurveTo(el[1].x, el[1].y, el[2].x, el[2].y, el[3].x, el[3].y);
      ctx.stroke();
      ctx.closePath();
    });
  }

  draw();

  function redraw(event: any) {
    const { x, y, width, height } = (
      canvas as HTMLCanvasElement
    ).getBoundingClientRect();

    if (event.clientX < x) return;
    if (event.clientX > x + width) return;
    if (event.clientY < y) return;
    if (event.clientY > y + height) return;

    refreshVertikalArr();
    refreshHorizontalArr();

    const canvX = event.clientX - x;
    const canvY = event.clientY - y;

    const actLineY = Math.floor(canvX / (rem * scale));
    const actLineX = Math.floor(canvY / (rem * scale));

    vertikalArr[actLineY + 1][1].x = canvX + 1.5 * rem * scale;
    vertikalArr[actLineY + 1][1].y = event.clientY - y;
    vertikalArr[actLineY + 1][2].x = canvX + 1.5 * rem * scale;
    vertikalArr[actLineY + 1][2].y = event.clientY - y;

    vertikalArr[actLineY][1].x = canvX - 1.5 * rem * scale;
    vertikalArr[actLineY][1].y = event.clientY - y;
    vertikalArr[actLineY][2].x = canvX - 1.5 * rem * scale;
    vertikalArr[actLineY][2].y = event.clientY - y;

    horizontalArr[actLineX + 1][1].x = event.clientX - x;
    horizontalArr[actLineX + 1][1].y = canvY + 1.5 * rem * scale;
    horizontalArr[actLineX + 1][2].x = event.clientX - x;
    horizontalArr[actLineX + 1][2].y = canvY + 1.5 * rem * scale;

    horizontalArr[actLineX][1].x = event.clientX - x;
    horizontalArr[actLineX][1].y = canvY - 1.5 * rem * scale;
    horizontalArr[actLineX][2].x = event.clientX - x;
    horizontalArr[actLineX][2].y = canvY - 1.5 * rem * scale;
  }

  const handleDraw = (e: any) => {
    console.log(123213);
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      return;
    } else {
      redraw(e);
      draw();
    }
  };

  return handleDraw;
};

export default useAnimationNet;
