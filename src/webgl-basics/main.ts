import "../style.css";

import { initShaders } from "../helpers/init-shaders";

import fshader from "./fshader.frag";
import vshader from "./vshader.vert";

function main(): void {
  const canvas = document.querySelector("canvas");
  const gl = canvas?.getContext("webgl");

  if (!gl) return void console.error("У вас не работает webgl!");

  const program = initShaders(gl, vshader, fshader);

  if (!program) {
    return void console.error("Не удалось проинициализировать шейдеры");
  }

  const aPosition = gl.getAttribLocation(program, "a_Position"); // Получаем ссылку для установления позиции из созданной программы.
  const aPointSize = gl.getAttribLocation(program, "a_PointSize"); // Получаем ссылку для установления размера из созданной программы.

  gl.vertexAttrib1f(aPointSize, 10.0); // Устанавливаем координаты в переменой атрибуте.

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  canvas?.addEventListener("mousedown", (event) =>
    handlerClick(event, gl, aPosition)
  );

  const gPoints: Array<[number, number]> = [];

  function handlerClick(
    { clientX, clientY, target }: MouseEvent,
    gl: WebGLRenderingContext,
    aPosition: number
  ): void {
    if (!target) return void 0;

    const { left, top } = (target as HTMLCanvasElement).getBoundingClientRect();

    const x = (clientX - left - gl.canvas.width / 2) / (gl.canvas.width / 2);
    const y = (gl.canvas.height / 2 - (clientY - top)) / (gl.canvas.height / 2);

    gPoints.push([x, y]);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (const [x, y] of gPoints) {
      gl.vertexAttrib3f(aPosition, x, y, 0.0); // Устанавливаем координаты в переменой атрибуте.

      gl.drawArrays(gl.POINTS, 0, 3);
    }
  }
}

document.addEventListener("DOMContentLoaded", main, { once: true });
