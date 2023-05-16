export function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | undefined {
  const shader = gl.createShader(type);

  if (!shader) throw new Error("Не удалось создать шейдер");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

export function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram();

  if (!program) throw new Error("Не удалось создать программу");

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (success) return program;

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

export function initShaders(
  gl: WebGLRenderingContext,
  vshader: string,
  fshader: string
) {
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fshader);
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vshader);

  if (!vertexShader || !fragmentShader) return void 0;

  const program = createProgram(gl, vertexShader, fragmentShader);

  if (program) gl.useProgram(program);

  return program;
}
