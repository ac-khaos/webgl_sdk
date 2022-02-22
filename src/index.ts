import glm from "./glmatrix";
// import * as glmatrix from "gl-matrix";
import * as webgl from "./core/webgl";
import vertexShaderCode from "./shaders/vertex";
import fragmentShaderCode from "./shaders/fragment";
import { cubeVertex } from "./core/modelGenerator";

console.log("glm: ", glm);
// console.log("glmatrix: ", glmatrix);

const __BYTESIEZ = 4;

const gl = webgl.create(document.getElementById("glcanvas") as HTMLCanvasElement, {
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  antialias: true,
});

const cubeModel = cubeVertex([0, 0, 0], 0.5, 0.2, 0.3);
console.log("cubeModel: ", cubeModel);

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
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeModel.vertices), gl.STATIC_DRAW);

const ebo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeModel.indices), gl.STATIC_DRAW)

const positionLocation = gl.getAttribLocation(program, "position");
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionLocation);

const matLocation = gl.getUniformLocation(program, "matrix");
gl.uniformMatrix4fv(matLocation, false, glm.rotateX(0));
gl.enable

// gl.drawElements(gl.TRIANGLES, cubeModel.indices.length, gl.UNSIGNED_SHORT, 0);

// const textureLocation = gl.getAttribLocation(program, "in_texture");
// gl.vertexAttribPointer(textureLocation, 2, gl.FLOAT, false, __BYTESIEZ * 9, __BYTESIEZ * 7);
// gl.enableVertexAttribArray(textureLocation);

import("./textures/tan.jpg").then(res => {
  const texture = gl.createTexture();
  const textureSampler1 = gl.getUniformLocation(program, "texture1");
  const image = new Image();
  image.src = res.default;
  image.onload = () => {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(textureSampler1, 0);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // gl.drawArrays(gl.TRIANGLES, 0, triangle.length);
    gl.drawElements(gl.TRIANGLES, cubeModel.indices.length, gl.UNSIGNED_SHORT, 0);
  };
});


