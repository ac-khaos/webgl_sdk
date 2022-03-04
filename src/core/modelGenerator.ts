export interface ModelDescribe {
  vertices: Array<Float32Array>;
  indices: Array<Uint16Array>;
}

export interface CubeSides {
  long: number;
  width: number;
  height: number;
}

function cubeModelCreater(centerPosition: Float32Array, sides: CubeSides): ModelDescribe {
  const c = { x: centerPosition[0], y: centerPosition[1], z: centerPosition[2] };
  const half = { w: sides.width / 2, l: sides.long / 2, h: sides.height / 2 };

  const v1 = [c.x - half.l, c.y + half.h, c.z + half.w];
  const v2 = [c.x - half.l, c.y + half.h, c.z - half.w];
  const v3 = [c.x + half.l, c.y + half.h, c.z - half.w];
  const v4 = [c.x + half.l, c.y + half.h, c.z + half.w];
  const v5 = [c.x - half.l, c.y - half.h, c.z + half.w];
  const v6 = [c.x - half.l, c.y - half.h, c.z - half.w];
  const v7 = [c.x + half.l, c.y - half.h, c.z - half.w];
  const v8 = [c.x + half.l, c.y - half.h, c.z + half.w];

  return {
    vertices: [v1, v2, v3, v4, v5, v6, v7, v8].map((v) => new Float32Array(v)),
    indices: [
      [0, 3, 7],
      [7, 4, 0], // 前
      [1, 2, 6],
      [6, 5, 1], // 后
      [0, 1, 5],
      [5, 4, 0], // 左
      [3, 2, 6],
      [6, 7, 3], // 右
      [0, 1, 2],
      [0, 3, 2], // 上
      [4, 5, 6],
      [4, 7, 6], // 下
    ].map((i) => new Uint16Array(i)),
  };
}

function modelGenerator(model: ModelDescribe) {
  const vertices2d = model.indices.flat().map((index) => model.vertices[index]);
  const indices = vertices2d.map((_, idx) => idx);
  return {
    vertices: new Float32Array(vertices2d.flat()),
    indices: new Uint16Array(indices),
  };
}

export default {
  cubeModelCreater,
  modelGenerator,
};
