import store from "@/store";

/* eslint-disable @typescript-eslint/no-explicit-any */
let canvas: HTMLCanvasElement | null = null;
let smallSquare: any;
let bigSquare: any;
let canvasHeight: number;
let canvasWidth: number;
let draw: any;
let ctx: any;

const rem = +window
  .getComputedStyle(document.body)
  .getPropertyValue("font-size")
  .slice(0, -2);

export const canvasCreate = (id: string, color: string) => {
  const body = document.body as HTMLBodyElement;
  const parentBlock = body.querySelector(
    ".js-contacts-figure",
  ) as HTMLDivElement;

  canvasHeight = parentBlock.offsetHeight - 1 * rem;

  canvasWidth = parentBlock.offsetWidth - 0.1 * rem;

  const img = new Image();
  if (store.getState().yang.isYang) {
    img.src = new URL("./assets/canvas_logo_yang.svg", import.meta.url).href;
  } else {
    img.src = new URL("./assets/logo_new.svg", import.meta.url).href;
  }
  // img.src = new URL("./assets/canvas_logo.svg", import.meta.url).href;

  const scale = window.devicePixelRatio;

  if (body.querySelectorAll(`#${id}`)?.length) {
    canvas = body.querySelector(`#${id}`) as HTMLCanvasElement;
    ctx = canvas.getContext("2d");

    if (devicePixelRatio >= 2) {
      ctx?.scale(2, 2);
    }

    bigSquare = {
      x1: 1,
      y1: 1,
      x2: 20,
      y2: 11.6,
      w: 19,
      h: 12,
    };
    refreshSizeSm();
  }

  if (!canvas) return;
  if (!ctx) return;

  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = Math.floor(canvasWidth * scale);
  canvas.height = Math.floor(canvasHeight * scale);
  ctx.scale(scale, scale);

  ctx.strokeStyle = color;
  ctx.lineWidth = 0.1 * rem;

  ctx.imageSmoothingEnabled = false;

  function refreshSizeSm() {
    smallSquare = {
      x1: Math.round(((canvasWidth / rem) * 50) / 100 - 5),
      y1: Math.round(((canvasHeight / rem) * 50) / 100 - 2.5),
      x2: Math.round(((canvasWidth / rem) * 50) / 100 + 5),
      y2: Math.round(((canvasHeight / rem) * 50) / 100 + 2.5),
    };
  }

  function _drawImage() {
    const x1 = Math.round(bigSquare.x1 * rem + rem);
    const y1 = Math.round(bigSquare.y1 * rem + rem);
    const x2 = Math.round((bigSquare.w - 2) * rem);
    const y2 = Math.round((bigSquare.h - 2) * rem);

    img.onload = function () {
      ctx.drawImage(img, x1, y1, x2, y2);
    };

    ctx.drawImage(img, x1, y1, x2, y2);
  }

  function drawBigSquare() {
    ctx.beginPath();
    ctx.moveTo(`${bigSquare.x1 * rem}`, `${bigSquare.y1 * rem}`);
    ctx.lineTo(`${bigSquare.x2 * rem}`, `${bigSquare.y1 * rem}`);
    ctx.lineTo(`${bigSquare.x2 * rem}`, `${bigSquare.y2 * rem}`);
    ctx.lineTo(`${bigSquare.x1 * rem}`, `${bigSquare.y2 * rem}`);
    ctx.lineTo(`${bigSquare.x1 * rem}`, `${bigSquare.y1 * rem}`);
    ctx.stroke();
    ctx.closePath();
  }

  function drawSmallSquare() {
    ctx.beginPath();
    ctx.moveTo(`${smallSquare.x1 * rem}`, `${smallSquare.y1 * rem}`);
    ctx.lineTo(`${smallSquare.x2 * rem}`, `${smallSquare.y1 * rem}`);
    ctx.lineTo(`${smallSquare.x2 * rem}`, `${smallSquare.y2 * rem}`);
    ctx.lineTo(`${smallSquare.x1 * rem}`, `${smallSquare.y2 * rem}`);
    ctx.lineTo(`${smallSquare.x1 * rem}`, `${smallSquare.y1 * rem}`);
    ctx.stroke();
    ctx.closePath();
  }

  function drawLine() {
    ctx.beginPath();

    ctx.moveTo(`${bigSquare.x1 * rem}`, `${bigSquare.y1 * rem}`);
    ctx.lineTo(`${smallSquare.x1 * rem}`, `${smallSquare.y1 * rem}`);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(`${bigSquare.x2 * rem}`, `${bigSquare.y1 * rem}`);
    ctx.lineTo(`${smallSquare.x2 * rem}`, `${smallSquare.y1 * rem}`);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(`${bigSquare.x2 * rem}`, `${bigSquare.y2 * rem}`);
    ctx.lineTo(`${smallSquare.x2 * rem}`, `${smallSquare.y2 * rem}`);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(`${bigSquare.x1 * rem}`, `${bigSquare.y2 * rem}`);
    ctx.lineTo(`${smallSquare.x1 * rem}`, `${smallSquare.y2 * rem}`);
    ctx.stroke();
    ctx.closePath();
  }

  draw = () => {
    drawLine();
    drawBigSquare();
    drawSmallSquare();
    _drawImage();
  };

  draw();
};

function redraw(event: any) {
  const canvasParam = (canvas as HTMLCanvasElement).getBoundingClientRect();
  const minLeftX =
    (event.clientX - canvasParam.left - (bigSquare.w / 2) * rem) / rem;
  const minRightX = minLeftX + bigSquare.w;
  const maxRightX = canvasParam.width / rem;
  const minTopY =
    (event.clientY - canvasParam.top - (bigSquare.h / 2) * rem) / rem;
  const minBottomY = minTopY + bigSquare.h;
  const maxBottomY = canvasParam.height / rem;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  if (event.clientX > canvasParam.left + (bigSquare.w / 2) * rem) {
    bigSquare.x1 = minLeftX;
    bigSquare.x2 = minRightX;
    if (event.clientX > canvasParam.right - (bigSquare.w / 2) * rem * 1.005) {
      bigSquare.x2 = maxRightX / 1.0025;
      bigSquare.x1 = bigSquare.x2 - bigSquare.w;
    }
  } else {
    bigSquare.x1 = 0;
    bigSquare.x2 = bigSquare.w;
  }

  if (event.clientY > canvasParam.top + (bigSquare.h / 2) * rem) {
    bigSquare.y1 = minTopY;
    bigSquare.y2 = minBottomY;
    if (event.clientY > canvasParam.bottom - (bigSquare.h / 2) * rem * 1.005) {
      bigSquare.y2 = maxBottomY / 1.0025;
      bigSquare.y1 = bigSquare.y2 - bigSquare.h;
    }
  } else {
    bigSquare.y1 = 0;
    bigSquare.y2 = bigSquare.h;
  }

  draw();
}

export const handleDraw = (e: any) => {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    return;
  } else {
    redraw(e);
  }
};
