// import { useAppSelector } from "@/hooks/hook";

/* eslint-disable @typescript-eslint/no-explicit-any */
const useRoom = () => {
  let canvas: HTMLCanvasElement | null = null;
  let ctx: any;
  let heightSquare: number;
  let widthSquare: number;
  let smallSquare: any;
  let lineWidth: number;
  let drawSmallSquare: any;

  let draw: any;

  let topSmallSquare: number;
  // let downSmallSquare: number;
  let leftSmallSquare: number;
  // let rightSmallSquare: number;
  let canvasHeight: number;
  let canvasWidth: number;

  const rem = +window
    .getComputedStyle(document.body)
    .getPropertyValue("font-size")
    .slice(0, -2);

  const createCanvas = (parentBlock: any) => {
    canvasHeight = parentBlock.offsetHeight;
    canvasWidth = parentBlock.offsetWidth;
    const scale = window.devicePixelRatio;

    heightSquare = Math.floor((canvasHeight / 100) * 30);
    widthSquare = Math.floor((canvasWidth / 100) * 18);

    topSmallSquare = Math.floor((canvasHeight - heightSquare) / 2);
    // downSmallSquare = Math.floor(topSmallSquare + heightSquare);
    leftSmallSquare = Math.floor((canvasWidth - widthSquare) / 2);
    // rightSmallSquare = Math.floor(leftSmallSquare + widthSquare);

    canvas = parentBlock.querySelector("canvas");
    ctx = canvas?.getContext("2d");
    lineWidth = 0.03 * rem;

    const img = new Image();
    img.src = new URL("./assets/canvas_logo.svg", import.meta.url).href;

    if (!canvas) return;
    if (!ctx) return;

    canvas.style.width = canvasWidth + "px";
    canvas.style.height = canvasHeight + "px";
    canvas.width = Math.floor(canvasWidth * scale);
    canvas.height = Math.floor(canvasHeight * scale);
    ctx.scale(scale, scale);
    ctx.strokeStyle = "#11FF00";
    ctx.lineWidth = lineWidth;
    ctx.imageSmoothingEnabled = false;

    smallSquare = {
      x1: leftSmallSquare,
      y1: topSmallSquare,
      x2: leftSmallSquare + widthSquare,
      y2: topSmallSquare + heightSquare,
      w: widthSquare,
      h: heightSquare,
    };

    drawSmallSquare = () => {
      ctx.beginPath();
      ctx.moveTo(`${smallSquare.x1}`, `${smallSquare.y1}`);
      ctx.lineTo(`${smallSquare.x2}`, `${smallSquare.y1}`);
      ctx.lineTo(`${smallSquare.x2}`, `${smallSquare.y2}`);
      ctx.lineTo(`${smallSquare.x1}`, `${smallSquare.y2}`);
      ctx.lineTo(`${smallSquare.x1}`, `${smallSquare.y1}`);
      ctx.stroke();
      ctx.closePath();
    };

    const _drawImage = () => {
      const x1 = Math.round(smallSquare.x1);
      const y1 = Math.round(smallSquare.y1);
      const x2 = Math.round(smallSquare.w - lineWidth / 2);
      const y2 = Math.round(smallSquare.h - lineWidth / 2);

      img.onload = function () {
        ctx.drawImage(img, x1, y1, x2, y2);
      };

      ctx.drawImage(img, x1, y1, x2, y2);
    };

    const drawBigSquare = () => {
      ctx.beginPath();
      ctx.moveTo(Math.floor((canvasWidth / 100) * 10), 0);
      ctx.lineTo(smallSquare.x1, smallSquare.y1);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(Math.floor((canvasWidth / 100) * 90), 0);
      ctx.lineTo(smallSquare.x2, smallSquare.y1);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(Math.floor((canvasWidth / 100) * 10), canvasHeight);
      ctx.lineTo(smallSquare.x1, smallSquare.y2);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(Math.floor((canvasWidth / 100) * 90), canvasHeight);
      ctx.lineTo(smallSquare.x2, smallSquare.y2);
      ctx.stroke();
      ctx.closePath();
    };

    draw = () => {
      // drawLines();
      drawBigSquare();
      drawSmallSquare();
      _drawImage();
    };

    draw();
  };

  const redraw = () => {
    const { x } = (canvas as HTMLCanvasElement).getBoundingClientRect();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    smallSquare = {
      x1: leftSmallSquare + x,
      y1: topSmallSquare,
      x2: leftSmallSquare + x + widthSquare,
      y2: topSmallSquare + heightSquare,
      w: widthSquare,
      h: heightSquare,
    };

    draw();
  };

  const handleDraw = () => {
    redraw();
    // console.log(window.scrollX, window.scrollY);
  };

  return { createCanvas, handleDraw };
};

export default useRoom;
