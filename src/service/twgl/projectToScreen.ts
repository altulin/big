/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import * as twgl from "twgl.js";

export function projectToScreen(gl: any, mvpMatrix: any, pos: any) {
  const ndc = twgl.m4.transformPoint(mvpMatrix, pos);

  console.log(gl.canvas.width);

  return [
    (ndc[0] * 0.5 + 0.5) * gl.canvas.width,
    (ndc[1] * -0.5 + 0.5) * gl.canvas.height,
  ];
}
