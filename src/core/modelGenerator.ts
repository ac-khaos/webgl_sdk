export interface ModelVertex {
  vertices: Float32Array,
  indices: Array<Number>,
}

export function cubeVertex(
  centerPosition: Float32Array,
  long: Number,
  width: Number,
  height: Number,
): ModelVertex {
  const c: { x: Number, y: Number, z: Number } = {
    x: centerPosition[0],
    y: centerPosition[1],
    z: centerPosition[2],
  };
  const half: { w: Number, l: Number, h: Number } = {
    w: width / 2,
    l: long / 2,
    h: height / 2,
  };

  return {
    vertices: [
      [c.x - half.l, c.y + half.h, c.z + half.w],
      [c.x - half.l, c.y + half.h, c.z - half.w],
      [c.x + half.l, c.y + half.h, c.z - half.w],
      [c.x + half.l, c.y + half.h, c.z + half.w],
      [c.x - half.l, c.y - half.h, c.z + half.w],
      [c.x - half.l, c.y - half.h, c.z - half.w],
      [c.x + half.l, c.y - half.h, c.z - half.w],
      [c.x + half.l, c.y - half.h, c.z + half.w],
    ].flat(),
    indices: [
      0, 3, 7, 7, 4, 0, // 前
      1, 2, 6, 6, 5, 1, // 后
      0, 1, 5, 5, 4, 0, // 左
      3, 2, 6, 3, 7, 6, // 右
      0, 1, 2, 0, 3, 2, // 上
      4, 5, 6, 4, 7, 6, // 下
    ],
  };
}
