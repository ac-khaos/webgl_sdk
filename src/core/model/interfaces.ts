export interface CubeSides {
  long: number;
  width: number;
  height: number;
}

export interface ModelVertex {
  // 顶点坐标 xyz
  position: [number, number, number];
}

export interface ModelFace {
  // 顶点索引
  indices: [number, number, number];
  // 颜色 rgba
  colors?: [
    [number, number, number, number],
    [number, number, number, number],
    [number, number, number, number]
  ];
  // 纹理
  texture?: Array<string>;
  // 纹理坐标 xy
  txrs?: [[number, number], [number, number], [number, number]];
}

export interface Model {
  // 顶点
  vertices: Array<ModelVertex>;
  // 面
  faces: Array<ModelFace>;
}
