import { Model, ModelFace, ModelVertex } from "./interfaces";

export default (model: Model) => {
  // 所有面的纹理坐标
  const txrs = [];
  // 索引转换为顶点
  const facesVertices = model.faces
    .map((face: ModelFace) => face.indices)
    .flat()
    .map((index: number) => model.vertices[index].position);
  // 所有面的索引
  const indices = facesVertices.map((_: Array<number>, idx: number) => idx);
  
  return {
    vertices: new Float32Array(facesVertices.flat()),
    indices: new Uint16Array(indices),
  };
};
