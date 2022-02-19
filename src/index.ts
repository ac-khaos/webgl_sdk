import glm from "./glmatrix";
import * as glmatrix from "gl-matrix";
import * as webgl from "./core/webgl";
import vertexShaderCode from "./shaders/vertex";
import fragmentShaderCode from "./shaders/fragment";
import { cube, triangle } from "./models";

console.log("glmatrix: ", glmatrix);

const __BYTESIEZ = 4;

const gl = webgl.create(document.getElementById("glcanvas") as HTMLCanvasElement, {
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  antialias: true,
});

// 设置着色器
const vertexShader = webgl.loadShader(gl, gl.VERTEX_SHADER, vertexShaderCode.exmaple);
const fragmentShader = webgl.loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderCode.example);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
gl.useProgram(program);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clearDepth(1.0);
gl.depthFunc(gl.LEQUAL);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, webgl.formatVertexArray(triangle), gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, "position");
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, __BYTESIEZ * 9, 0);
gl.enableVertexAttribArray(positionLocation);

const textureLocation = gl.getAttribLocation(program, "in_texture");
gl.vertexAttribPointer(textureLocation, 2, gl.FLOAT, false, __BYTESIEZ * 9, __BYTESIEZ * 7);
gl.enableVertexAttribArray(textureLocation);

const texture = gl.createTexture();
const textureSampler1 = gl.getUniformLocation(program, "texture1");
const image = new Image();
image.src = "./textures/textureExample.jpeg";
image.onload = () => {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.uniform1i(textureSampler1, 0);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.depthFunc(gl.LEQUAL);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, triangle.length);
};
