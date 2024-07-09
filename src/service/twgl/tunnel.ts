import * as twgl from "twgl.js";
import { calculateVisibility } from "./calculateVisibility";
import { projectToScreen } from "./projectToScreen";

export function initGLTunnel(id) {
  const canvas = document.getElementById(id);

  if (!canvas) {
    return;
  }

  const imgContainer = canvas.parentNode.querySelector("#imageContainer");
  const img = imgContainer.querySelector("#image");

  const gl = canvas.getContext("webgl");

  const vsLines = `
      attribute vec4 position;
      uniform mat4 u_matrix;
  
      void main() {
          gl_Position = u_matrix * position;
      }
  `;

  const fsLines = `
      precision mediump float;
  
      void main() {
          gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);  // Green color
      }
  `;

  const programInfoLines = twgl.createProgramInfo(gl, [vsLines, fsLines]);

  const positions = [];
  const lines = 40;
  const length = 5.0;
  const tunnelWidth = 1.25;
  const tunnelHeight = 1;

  function setupTunnel() {
    const frontWidth = 2;
    const backWidth = 1.25;

    for (let i = 0; i < lines; i++) {
      const z = (-i * length) / lines;
      const width = frontWidth - (frontWidth - backWidth) * (i / lines);
      const xOffset = 0;

      positions.push(
        -width / 2 + xOffset,
        tunnelHeight / 2,
        z,
        width / 2 + xOffset,
        tunnelHeight / 2,
        z,
      );
      positions.push(
        -width / 2 + xOffset,
        -tunnelHeight / 2,
        z,
        width / 2 + xOffset,
        -tunnelHeight / 2,
        z,
      );
      positions.push(
        width / 2 + xOffset,
        tunnelHeight / 2,
        z,
        width / 2 + xOffset,
        -tunnelHeight / 2,
        z,
      );
      positions.push(
        -width / 2 + xOffset,
        tunnelHeight / 2,
        z,
        -width / 2 + xOffset,
        -tunnelHeight / 2,
        z,
      );
    }

    const arraysLines = {
      position: { numComponents: 3, data: positions },
    };

    const bufferInfoLines = twgl.createBufferInfoFromArrays(gl, arraysLines);

    function render(time) {
      time *= 0.001;

      twgl.resizeCanvasToDisplaySize(gl.canvas);

      const scroll = calculateVisibility(canvas);
      const cameraX = 0.3 - (scroll / 100) * 0.6;

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const fov = (60 * Math.PI) / 180;
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      const zNear = 0.25;
      const zFar = 100;
      const projection = twgl.m4.perspective(fov, aspect, zNear, zFar);
      const targetX = (0.5 - scroll / 100) * -1;

      const eye = [cameraX, 0, 0];
      const target = [targetX, 0, -1];
      const up = [0, 1, 0];
      const camera = twgl.m4.lookAt(eye, target, up);
      const view = twgl.m4.inverse(camera);
      const viewProjection = twgl.m4.multiply(projection, view);

      const matrix = twgl.m4.translate(viewProjection, [0, 0, 0]);

      gl.useProgram(programInfoLines.program);
      twgl.setBuffersAndAttributes(gl, programInfoLines, bufferInfoLines);
      twgl.setUniforms(programInfoLines, { u_matrix: matrix });
      twgl.drawBufferInfo(gl, bufferInfoLines, gl.LINES);

      const farZ = -length;
      const width = backWidth;
      const topLeft = [-width / 2, tunnelHeight / 2, farZ];
      const topRight = [width / 2, tunnelHeight / 2, farZ];
      const bottomLeft = [-width / 2, -tunnelHeight / 2, farZ];
      const bottomRight = [width / 2, -tunnelHeight / 2, farZ];

      const [screenTopLeftX, screenTopLeftY] = projectToScreen(
        gl,
        matrix,
        topLeft,
      );
      const [screenTopRightX, screenTopRightY] = projectToScreen(
        gl,
        matrix,
        topRight,
      );
      const [screenBottomLeftX, screenBottomLeftY] = projectToScreen(
        gl,
        matrix,
        bottomLeft,
      );
      const [screenBottomRightX, screenBottomRightY] = projectToScreen(
        gl,
        matrix,
        bottomRight,
      );

      const left = Math.min(screenTopLeftX, screenBottomLeftX);
      const top = Math.min(screenTopLeftY, screenTopRightY);
      const right = Math.max(screenTopRightX, screenBottomRightX);
      const bottom = Math.max(screenBottomLeftY, screenBottomRightY);

      imgContainer.style.top = `${top}px`;
      imgContainer.style.left = `${left}px`;
      imgContainer.style.width = `${right - left}px`;
      imgContainer.style.height = `${bottom - top}px`;

      const clipTopLeftX = ((screenTopLeftX - left) / (right - left)) * 100;
      const clipTopLeftY = ((screenTopLeftY - top) / (bottom - top)) * 100;
      const clipTopRightX = ((screenTopRightX - left) / (right - left)) * 100;
      const clipTopRightY = ((screenTopRightY - top) / (bottom - top)) * 100;
      const clipBottomLeftX =
        ((screenBottomLeftX - left) / (right - left)) * 100;
      const clipBottomLeftY =
        ((screenBottomLeftY - top) / (bottom - top)) * 100;
      const clipBottomRightX =
        ((screenBottomRightX - left) / (right - left)) * 100;
      const clipBottomRightY =
        ((screenBottomRightY - top) / (bottom - top)) * 100;

      img.style.clipPath = `polygon(
              ${clipTopLeftX}% ${clipTopLeftY}%, 
              ${clipTopRightX}% ${clipTopRightY}%, 
              ${clipBottomRightX}% ${clipBottomRightY}%, 
              ${clipBottomLeftX}% ${clipBottomLeftY}%
          )`;

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  setupTunnel();
}
