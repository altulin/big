import * as twgl from "twgl.js";
import { calculateVisibility } from "./calculateVisibility";

export function initGLSphere(id: string) {
  const canvas = document.getElementById(id);

  if (!canvas) {
    return;
  }

  const m4 = twgl.m4;
  const gl = twgl.getWebGLContext(canvas);
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  const programInfo = twgl.createProgramInfo(gl, [
    `
        attribute vec4 position;
        uniform mat4 u_matrix;
        void main() {
          gl_Position = u_matrix * position;
        }
        `,
    `
        precision mediump float;
        void main() {
          gl_FragColor = vec4(0, 1, 0, 1); // green color
        }
        `,
  ]);

  function createSphereLines(verticalLines, horizontalLines) {
    const positions = [];
    const indices = [];
    const radius = 1.3;

    // Generate vertices
    for (let j = 0; j <= horizontalLines; j++) {
      const phi = (j * Math.PI) / horizontalLines;
      for (let i = 0; i <= verticalLines; i++) {
        const theta = (i * 2 * Math.PI) / verticalLines;
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);
        positions.push(x, y, z);
      }
    }

    // Generate indices for vertical lines
    for (let j = 0; j < horizontalLines; j++) {
      for (let i = 0; i <= verticalLines; i++) {
        const a = i + j * (verticalLines + 1);
        const b = a + verticalLines + 1;
        if (i % 5 == 0) {
          indices.push(a, b);
        }
      }
    }

    // Generate indices for horizontal lines
    for (let j = 0; j <= horizontalLines; j++) {
      for (let i = 0; i < verticalLines; i++) {
        const a = i + j * (verticalLines + 1);
        const b = a + 1;
        if (j % 5 == 0) {
          indices.push(a, b);
        }
      }
    }

    return {
      position: positions,
      indices: indices,
    };
  }

  const sphereLines = createSphereLines(50, 50);
  const bufferInfo = twgl.createBufferInfoFromArrays(gl, sphereLines);
  const prevScroll = 0;
  const scrollDirection = "down";

  function render(time) {
    time *= 0.001;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const scroll = calculateVisibility(canvas);

    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const projectionMatrix = m4.perspective(Math.PI / 4, aspect, 0.1, 10);
    const eye = [1.5, 2, 2.5];
    const target = [0, 0, 0];
    const up = [0, 1, 0];
    const cameraMatrix = m4.lookAt(eye, target, up);
    const viewMatrix = m4.inverse(cameraMatrix);
    const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

    const rotationTarget = scroll / 20; // Вращение зависит от процента скролла. Чем меньше делитель, тем больше амплитуда

    const worldMatrix = m4.rotationY(rotationTarget);

    const matrix = m4.multiply(viewProjectionMatrix, worldMatrix);

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, {
      u_matrix: matrix,
    });
    twgl.drawBufferInfo(gl, bufferInfo, gl.LINES);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
