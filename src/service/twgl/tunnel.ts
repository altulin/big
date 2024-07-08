import { calculateVisibility } from "./calculateVisibility";
import * as twgl from "twgl.js";
import { projectToScreen } from "./projectToScreen";

export function initGLTunnel(id: string, imgContainer: HTMLDivElement) {
  const canvas = document.getElementById(id);

  if (!canvas) {
    return;
  }

  //   const imgContainer = canvas.parentNode.querySelector("#imageContainer");

  const gl = (canvas as HTMLCanvasElement)?.getContext("webgl");

  // Vertex shader for lines
  const vsLines = `
        attribute vec4 position;
        uniform mat4 u_matrix;
    
        void main() {
            gl_Position = u_matrix * position;
        }
    `;

  // Fragment shader for lines
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

    // Generate tunnel lines
    for (let i = 0; i < lines; i++) {
      const z = (-i * length) / lines;
      const width = frontWidth - (frontWidth - backWidth) * (i / lines);
      const xOffset = 0;

      // Top and bottom lines
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
      // Right and left lines
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

    function render() {
      //   time *= 0.001;

      twgl.resizeCanvasToDisplaySize(gl?.canvas as HTMLCanvasElement);

      const scroll = calculateVisibility(canvas);

      const cameraX = 0.3 - (scroll / 100) * 0.6;

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const fov = (60 * Math.PI) / 180;
      const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      const zNear = 0.25;
      const zFar = 100;
      const projection = twgl.m4.perspective(fov, aspect, zNear, zFar);

      const eye = [cameraX, 0, 0];
      const target = [(0.5 - scroll / 100) * -1, 0, -1];
      const up = [0, 1, 0];
      const camera = twgl.m4.lookAt(eye, target, up);
      const view = twgl.m4.inverse(camera);
      const viewProjection = twgl.m4.multiply(projection, view);

      const matrix = twgl.m4.translate(viewProjection, [0, 0, 0]);

      // Draw tunnel lines
      gl.useProgram(programInfoLines.program);
      twgl.setBuffersAndAttributes(gl, programInfoLines, bufferInfoLines);
      twgl.setUniforms(programInfoLines, {
        u_matrix: matrix,
      });
      twgl.drawBufferInfo(gl, bufferInfoLines, gl.LINES);

      const farZ = -length;
      const width = backWidth;
      const topLeft = [-width / 2, tunnelHeight / 2, farZ];
      const bottomRight = [width / 2, -tunnelHeight / 2, farZ];

      //   const [screenTopLeftX, screenTopLeftY] = projectToScreen(
      //     gl,
      //     matrix,
      //     topLeft,
      //   );
      //   const [screenBottomRightX, screenBottomRightY] = projectToScreen(
      //     gl,
      //     matrix,
      //     bottomRight,
      //   );

      const imgWidth = screenBottomRightX - screenTopLeftX;
      const imgHeight = screenBottomRightY - screenTopLeftY;

      imgContainer.style.width = `${imgWidth}px`;
      imgContainer.style.height = `${imgHeight}px`;

      //   const rotationAngle = Math.atan(0.5 - scroll / 100) * -6;
      const angle = Math.atan2(
        bottomRight[1] - topLeft[1],
        bottomRight[0] - topLeft[0],
      );

      const imgTransform = `
                                    translate(${screenTopLeftX}px, ${screenTopLeftY}px)
                                    rotate(${angle}deg)
                                    scale(${
                                      imgWidth / imgContainer.offsetWidth
                                    }, ${imgHeight / imgContainer.offsetHeight})
                                `;
      imgContainer.style.transform = imgTransform;

      requestAnimationFrame(render);
    }
    // requestAnimationFrame(render);
  }

  setupTunnel();
}
