import glm from "./glmatrix";
// import * as glmatrix from "gl-matrix";
import * as webgl from "./core/webgl";
import vertexShaderCode from "./shaders/vertex";
import fragmentShaderCode from "./shaders/fragment";
import mg from "./core/modelGenerator";

console.log("glm: ", glm);
// console.log("glmatrix: ", glmatrix);

const BYTESIEZ = 4;

const gl = webgl.create(document.getElementById("glcanvas") as HTMLCanvasElement, {
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  antialias: true,
});

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);

const cube = mg.cubeModelGenerator([0, 0, 0], { long: 0.5, width: 0.5, height: 0.5 });
console.log("11111111-------", cube);

const cubeModel = mg.dataGenerator(
  mg.cubeModelGenerator([0, 0, 0], { long: 0.5, width: 0.5, height: 0.5 })
);
cubeModel.textureVertices = new Float32Array(
  [
    [0.0, 1.0, 1.0, 1.0, 1.0, 0.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0],
    // [0.0, 1.0, 1.0, 1.0, 1.0, 0.0],
    // [1.0, 0.0, 0.0, 0.0, 0.0, 1.0],
    // [0.0, 1.0, 1.0, 1.0, 1.0, 0.0],
    // [1.0, 0.0, 0.0, 0.0, 0.0, 1.0],
    // [0.0, 1.0, 1.0, 1.0, 1.0, 0.0],
    // [1.0, 0.0, 0.0, 0.0, 0.0, 1.0],
    // [0.0, 1.0, 1.0, 1.0, 1.0, 0.0],
    // [1.0, 0.0, 0.0, 0.0, 0.0, 1.0],
    // [0.0, 1.0, 1.0, 1.0, 1.0, 0.0],
    // [1.0, 0.0, 0.0, 0.0, 0.0, 1.0],
  ].flat()
);

// 设置着色器
const vertexShader = webgl.loadShader(gl, gl.VERTEX_SHADER, vertexShaderCode.exmaple);
const fragmentShader = webgl.loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode.example);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
gl.useProgram(program);

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cube.vertices.flat()), gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, "position");
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionLocation);

const textureBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
gl.bufferData(gl.ARRAY_BUFFER, cubeModel.textureVertices, gl.STATIC_DRAW);

// const textureLocation = gl.getAttribLocation(program, "in_texture");
// gl.vertexAttribPointer(textureLocation, 2, gl.FLOAT, false, 0, 0);
// gl.enableVertexAttribArray(textureLocation);

const matLocation = gl.getUniformLocation(program, "matrix");
gl.uniformMatrix4fv(matLocation, false, glm.rotateX(0));

const ebo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cube.indices.flat()), gl.STATIC_DRAW);

import("./textures/tan.jpg").then((res) => {
  const texture = gl.createTexture();
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  const image = new Image();
  image.src = res.default;
  image.onload = () => {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    const textureSampler1 = gl.getUniformLocation(program, "texture1");
    gl.uniform1i(textureSampler1, 0);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_bit);

    // gl.drawElements(gl.TRIANGLES, cubeModel.indices.length, gl.UNSIGNED_SHORT, 0);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };
});

Promise.all([
  import("./textures/tan.jpg"),
  import("./textures/texture2.jpeg"),
  import("./textures/textureExample.jpeg"),
]).then((imps) => {});
