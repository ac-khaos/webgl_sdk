import { CubeSides, Model } from "./interfaces";

function cube(centerPosition: Array<number>, sides: CubeSides): Model {
  const c = {
    x: centerPosition[0],
    y: centerPosition[1],
    z: centerPosition[2],
  };
  const half = { w: sides.width / 2, l: sides.long / 2, h: sides.height / 2 };

  return {
    vertices: [
      { position: [c.x - half.l, c.y + half.h, c.z + half.w] },
      { position: [c.x - half.l, c.y + half.h, c.z - half.w] },
      { position: [c.x + half.l, c.y + half.h, c.z - half.w] },
      { position: [c.x + half.l, c.y + half.h, c.z + half.w] },
      { position: [c.x - half.l, c.y - half.h, c.z + half.w] },
      { position: [c.x - half.l, c.y - half.h, c.z - half.w] },
      { position: [c.x + half.l, c.y - half.h, c.z - half.w] },
      { position: [c.x + half.l, c.y - half.h, c.z + half.w] },
    ],
    faces: [
      {
        indices: [0, 3, 7],
        txrs: [
          [0.0, 1.0],
          [1.0, 1.0],
          [1.0, 0.0],
        ],
      },
      {
        indices: [7, 4, 0],
        txrs: [
          [1.0, 0.0],
          [0.0, 0.0],
          [0.0, 1.0],
        ],
      },
      {
        indices: [1, 2, 6],
        txrs: [
          [1.0, 1.0],
          [0.0, 1.0],
          [0.0, 0.0],
        ],
      },
      {
        indices: [6, 5, 1],
        txrs: [
          [0.0, 0.0],
          [1.0, 0.0],
          [1.0, 1.0],
        ],
      },
      {
        indices: [0, 1, 5],
        txrs: [
          [0.0, 1.0],
          [1.0, 1.0],
          [1.0, 0.0],
        ],
      },
      {
        indices: [5, 4, 0],
        txrs: [
          [1.0, 0.0],
          [0.0, 0.0],
          [0.0, 1.0],
        ],
      },
      {
        indices: [3, 2, 6],
        txrs: [
          [0.0, 1.0],
          [1.0, 1.0],
          [1.0, 0.0],
        ],
      },
      {
        indices: [6, 7, 3],
        txrs: [
          [1.0, 0.0],
          [0.0, 0.0],
          [0.0, 1.0],
        ],
      },
      {
        indices: [0, 1, 2],
        txrs: [
          [0.0, 0.0],
          [0.0, 1.0],
          [1.0, 1.0],
        ],
      },
      {
        indices: [0, 3, 2],
        txrs: [
          [0.0, 0.0],
          [1.0, 0.0],
          [1.0, 1.0],
        ],
      },
      {
        indices: [4, 5, 6],
        txrs: [
          [0.0, 0.0],
          [0.0, 1.0],
          [1.0, 1.0],
        ],
      },
      {
        indices: [4, 7, 6],
        txrs: [
          [0.0, 0.0],
          [1.0, 0.0],
          [1.0, 1.0],
        ],
      },
    ],
  };
}

export default {
  cube,
};
