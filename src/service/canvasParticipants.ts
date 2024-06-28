/* eslint-disable @typescript-eslint/no-explicit-any */
const useRoom = () => {
  const canvas: HTMLCanvasElement | null = null;

  const createCanvas = (parentBlock: any) => {
    const canvasHeight = parentBlock.offsetHeight;
    const canvasWidth = parentBlock.offsetWidth;
  };

  const img = new Image();
  img.src = new URL("./assets/canvas_logo.svg", import.meta.url).href;

  const scale = window.devicePixelRatio;

  return createCanvas;
};

export default useRoom;
