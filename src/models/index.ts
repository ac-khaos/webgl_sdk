import { VectexDescribe } from "../core/webgl";

export const cube: Array<Float32Array> = [
  [0.5, 0.5, 0.5],
  [0.5, 0.5, -0.5],
  [0.5, -0.5, 0.5],
  [0.5, -0.5, -0.5],
  [-0.5, 0.5, 0.5],
  [-0.5, 0.5, -0.5],
  [-0.5, -0.5, 0.5],
  [-0.5, -0.5, -0.5],
];

export const triangle: Array<VectexDescribe> = [
  {
    vertex: [0, 0.5, 0],
    color: [0.3, 0.7, 0.4, 1.0],
    texture: [0.5, 0],
  },
  {
    vertex: [0.5, -0.5, 0],
    color: [0.3, 0.7, 0.4, 1.0],
    texture: [1, 1],
  },
  {
    vertex: [-0.5, -0.5, 0],
    color: [0.3, 0.7, 0.4, 1.0],
    texture: [0, 1],
  },
];
