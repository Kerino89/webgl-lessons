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

  gl.vertexAttrib3f(aPosition, 0.5, 0.0, 0.0); // Устанавливаем координаты в переменой атрибуте.
  gl.vertexAttrib1f(aPointSize, 10.0); // Устанавливаем координаты в переменой атрибуте.

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 3);
}

document.addEventListener("DOMContentLoaded", main, { once: true });
