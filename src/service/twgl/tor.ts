import * as twgl from "twgl.js";
import { calculateVisibility } from "./calculateVisibility";

export function initGLTor(id: string) {
  const canvas = document.getElementById(id);

  const gl = (canvas as HTMLCanvasElement)?.getContext("webgl");

  if (!gl) return;

  const programInfo = twgl.createProgramInfo(gl, [
    `attribute vec4 position;
         attribute vec3 normal;
         uniform mat4 u_matrix;
         varying vec3 v_normal;
         varying vec4 v_position;
         void main() {
             v_position = u_matrix * position;
             v_normal = mat3(u_matrix) * normal; // Трансформация нормали
             gl_Position = v_position;
         }`,
    `precision mediump float;
         varying vec3 v_normal;
         varying vec4 v_position;
         uniform vec4 u_color;
         uniform vec3 u_cameraDirection;
         void main() {
             vec3 normal = normalize(v_normal);
             if (dot(normal, u_cameraDirection) > 0.0) {
                 gl_FragColor = u_color;
             } else {
                 discard;
             }
         }`,
  ]);

  const majorRadius = 1;
  const minorRadius = 0.3;
  const numMajor = 70;
  const numMinor = 40;

  const positions: number[] = [];
  const normals: number[] = [];
  const lineIndices: number[] = [];

  for (let i = 0; i <= numMajor; ++i) {
    const majorAngle = (i / numMajor) * 2 * Math.PI;
    const centerX = Math.cos(majorAngle) * majorRadius;
    const centerY = Math.sin(majorAngle) * majorRadius;
    for (let j = 0; j <= numMinor; ++j) {
      const minorAngle = (j / numMinor) * 2 * Math.PI;
      const x =
        centerX + Math.cos(minorAngle) * minorRadius * Math.cos(majorAngle);
      const y =
        centerY + Math.cos(minorAngle) * minorRadius * Math.sin(majorAngle);
      const z = Math.sin(minorAngle) * minorRadius;
      positions.push(x, y, z);

      const nx = Math.cos(minorAngle) * Math.cos(majorAngle);
      const ny = Math.cos(minorAngle) * Math.sin(majorAngle);
      const nz = Math.sin(minorAngle);
      normals.push(nx, ny, nz);
    }
  }

  for (let i = 0; i < numMajor; ++i) {
    for (let j = 0; j < numMinor; ++j) {
      const p0 = i * (numMinor + 1) + j;
      const p1 = p0 + 1;
      const p2 = p0 + (numMinor + 1);
      const p3 = p2 + 1;

      // Longitudinal lines
      if (i % 5 == 0) {
        lineIndices.push(p0, p1);
      }

      // Transverse lines
      if (j % 2 == 0) {
        lineIndices.push(p1, p3);
      }
    }
  }

  //   const lineBufferInfo = twgl.createBufferInfoFromArrays(gl, {
  //     position: { numComponents: 3, data: positions },
  //     normal: { numComponents: 3, data: normals },
  //     indices: { numComponents: 2, data: lineIndices },
  //   });

  gl?.enable(gl.DEPTH_TEST);
  gl?.enable(gl.CULL_FACE);

  //   let rotationAngle: number = 0;
  let animationOffset = 0;

  function render() {
    const scroll = calculateVisibility(canvas);

    // rotationAngle = scroll / 10;
    animationOffset = scroll / 100; // Амплитуда вращения. Меньше делитель — больше амплитуда

    const animatedPositions = positions.slice();
    const animatedNormals = normals.slice();

    for (let i = 0; i <= numMajor; ++i) {
      const majorAngle = (i / numMajor) * 2 * Math.PI;
      const centerX = Math.cos(majorAngle) * majorRadius;
      const centerY = Math.sin(majorAngle) * majorRadius;
      for (let j = 0; j <= numMinor; ++j) {
        const minorAngle = (j / numMinor + animationOffset) * 2 * Math.PI;
        const x =
          centerX + Math.cos(minorAngle) * minorRadius * Math.cos(majorAngle);
        const y =
          centerY + Math.cos(minorAngle) * minorRadius * Math.sin(majorAngle);
        const z = Math.sin(minorAngle) * minorRadius;
        const index = (i * (numMinor + 1) + j) * 3;
        animatedPositions[index] = x;
        animatedPositions[index + 1] = y;
        animatedPositions[index + 2] = z;

        const nx = Math.cos(minorAngle) * Math.cos(majorAngle);
        const ny = Math.cos(minorAngle) * Math.sin(majorAngle);
        const nz = Math.sin(minorAngle);
        animatedNormals[index] = nx;
        animatedNormals[index + 1] = ny;
        animatedNormals[index + 2] = nz;
      }
    }

    const animatedLineBufferInfo = twgl.createBufferInfoFromArrays(gl, {
      position: { numComponents: 3, data: animatedPositions },
      normal: { numComponents: 3, data: animatedNormals },
      indices: { numComponents: 2, data: lineIndices },
    });

    twgl.resizeCanvasToDisplaySize(gl?.canvas as HTMLCanvasElement);

    gl?.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl?.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const aspect =
      (gl?.canvas as HTMLCanvasElement).clientWidth /
      (gl?.canvas as HTMLCanvasElement).clientHeight;
    const projectionMatrix = twgl.m4.perspective(
      (30 * Math.PI) / 180,
      aspect,
      0.5,
      10,
    );

    const cameraPosition = [0, -4, 4];
    const target = [0, 0, 0];
    const up = [0, 1, 0];
    const cameraMatrix = twgl.m4.lookAt(cameraPosition, target, up);
    const viewMatrix = twgl.m4.inverse(cameraMatrix);
    const matrix = twgl.m4.multiply(projectionMatrix, viewMatrix);

    // Render lines
    gl?.useProgram(programInfo.program);

    if (!gl) return;

    twgl.setBuffersAndAttributes(gl, programInfo, animatedLineBufferInfo);
    twgl.setUniforms(programInfo, {
      u_cameraDirection: [0, 0, -4],
      u_matrix: matrix,
      u_color: [0, 1, 0, 1], // Green color
    });
    gl?.drawElements(
      gl.LINES,
      animatedLineBufferInfo.numElements,
      gl.UNSIGNED_SHORT,
      0,
    );

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
