/* eslint-disable @typescript-eslint/no-explicit-any */
import * as twgl from "twgl.js";

export function initGLGrid(id: string, isYang: any) {
  const canvas = document.getElementById(id);

  if (!canvas) {
    return;
  }

  const vs = `
    attribute vec4 position;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_intensity;
    varying vec2 v_uv;
    void main() {
      vec2 pos = position.xy * 2.0 - 1.0;
      vec2 mouse = vec2(u_mouse.x, u_resolution.y - u_mouse.y) / u_resolution * 2.0 - 1.0; // Flip Y coordinate
      float dist = length(pos - mouse);
      float ripple = sin(dist * 20.0 - u_time * 5.0) * exp(-dist * 10.0) * 0.1 * u_intensity;
      pos += normalize(pos - mouse) * ripple;
      gl_Position = vec4(pos, 0, 1);
      v_uv = position.xy;
    }`;

  const fs = isYang
    ? `
    precision mediump float;
    varying vec2 v_uv;
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Green color
    }`
    : `
    precision mediump float;
    varying vec2 v_uv;
    void main() {
      gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // Green color
    }`;

  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: false,
    depth: true,
  });
  twgl.resizeCanvasToDisplaySize(gl.canvas);

  const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

  const gridSize = 24;
  const positions = [];
  const indices = [];

  for (let y = 0; y <= gridSize; y++) {
    for (let x = 0; x <= gridSize; x++) {
      const width = x / gridSize;
      const height = y / gridSize;

      positions.push(width, height + width, 0);

      if (x < gridSize) {
        const index = y * (gridSize + 1) + x;
        indices.push(index, index + 1);
      }
    }
  }

  const bufferInfo = twgl.createBufferInfoFromArrays(gl, {
    position: positions,
    indices: indices,
  });

  let mouseX = 0,
    mouseY = 0;
  let lastMouseX = 0,
    lastMouseY = 0;
  let lastMoveTime = 0;
  let intensity = 1.0;

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    lastMoveTime = performance.now();
  });

  function render(time) {
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const mouseMoved = mouseX !== lastMouseX || mouseY !== lastMouseY;
    lastMouseX = mouseX;
    lastMouseY = mouseY;

    if (!mouseMoved) {
      const elapsedTime = (performance.now() - lastMoveTime) / 1000;
      intensity = Math.max(0.0, Math.exp(-elapsedTime));
    } else {
      intensity = 1.0;
    }

    const uniforms = {
      u_resolution: [gl.canvas.width, gl.canvas.height],
      u_mouse: [mouseX, mouseY],
      u_time: time * 0.001,
      u_intensity: intensity,
    };

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    twgl.drawBufferInfo(gl, bufferInfo, gl.LINES);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
