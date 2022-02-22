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
      c.x - half.l, c.y + half.h, c.z + half.w,
      c.x - half.l, c.y + half.h, c.z - half.w,
      c.x + half.l, c.y + half.h, c.z - half.w,
      c.x + half.l, c.y + half.h, c.z + half.w,
      c.x - half.l, c.y - half.h, c.z + half.w,
      c.x - half.l, c.y - half.h, c.z - half.w,
      c.x + half.l, c.y - half.h, c.z - half.w,
      c.x + half.l, c.y - half.h, c.z + half.w,
    ],
    indices: [
      0, 1, 3,
      0, 1, 4,
      0, 3, 4,
      2, 1, 3,
      2, 1, 6,
      2, 3, 6,
      7, 3, 4,
      7, 3, 6,
      7, 4, 6,
      5, 1, 4,
      5, 1, 6,
      5, 4, 6,
    ],
  };
}
