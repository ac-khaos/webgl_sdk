import glm from "./glmatrix";
// import * as glmatrix from "gl-matrix";
import * as webgl from "./core/webgl";
import { exampleShaders } from "./shaders";
import model from "./core/model";

console.log("glm: ", glm);
// console.log("glmatrix: ", glmatrix);

const BYTESIEZ = 4;

const gl = webgl.create(
  document.getElementById("glcanvas") as HTMLCanvasElement,
  {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
    antialias: true,
  }
);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);

const cubeModel = model.generator(
  model.creater["cube"]([0, 0, 0], { long: 0.5, width: 0.5, height: 0.5 })
);

console.log("ssssss-----", cubeModel);

// 设置着色器
const vertexShader = webgl.loadShader(
  gl,
  gl.VERTEX_SHADER,
  exampleShaders.vertexShader
);
const fragmentShader = webgl.loadShader(
  gl,
  gl.FRAGMENT_SHADER,
  exampleShaders.fragmentShader
);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
gl.useProgram(program);

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, cubeModel.vertices, gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, "position");
gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionLocation);

const tbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, tbo);
gl.bufferData(gl.ARRAY_BUFFER, cubeModel.txrs, gl.STATIC_DRAW);

const textureLocation = gl.getAttribLocation(program, "in_texture");
gl.vertexAttribPointer(textureLocation, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(textureLocation);

const ebo = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cubeModel.indices, gl.STATIC_DRAW);

import("./textures/textureExample.jpeg").then((res) => {
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

    let xdeg = 0,
      ydeg = 0,
      zdeg = 0;
    setInterval(() => {
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const matLocationx = gl.getUniformLocation(program, "rotatex_matrix");
      gl.uniformMatrix4fv(matLocationx, false, glm.rotateX(xdeg));
      const matLocationy = gl.getUniformLocation(program, "rotatey_matrix");
      gl.uniformMatrix4fv(matLocationy, false, glm.rotateY(ydeg));
      const matLocationz = gl.getUniformLocation(program, "rotatez_matrix");
      gl.uniformMatrix4fv(matLocationz, false, glm.rotateZ(zdeg));

      gl.drawElements(
        gl.TRIANGLES,
        cubeModel.indices.length,
        gl.UNSIGNED_SHORT,
        0
      );

      zdeg = zdeg === 360 ? 0 : zdeg + 0.1;
      xdeg = xdeg === 360 ? 0 : xdeg + 0.1;
      ydeg = ydeg === 360 ? 0 : ydeg + 0.1;
    }, 10);
  };
});

// Promise.all([
//   import("./textures/tan.jpg"),
//   import("./textures/texture2.jpeg"),
//   import("./textures/textureExample.jpeg"),
// ]).then((imps) => {});
