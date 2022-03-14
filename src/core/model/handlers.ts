import { Model, ModelFace, ModelVertex, Texture } from "./interfaces";

// 模型数据处理
function convert (model: Model) {
  // 所有面的纹理坐标
  const txrsArr: Array<Array<number>> = [];
  // 索引转换为顶点
  const positions: Array<Array<number>> = [];
  model.faces.forEach((face: ModelFace) => {
    txrsArr.push(face.txrs.flat());
    face.indices.forEach((vertexIndex: number) =>  {
      positions.push(model.vertices[vertexIndex].position);
    });
  });
  // 所有面的索引
  const indices = positions.map((_: Array<number>, idx: number) => idx);
  
  return {
    vertices: new Float32Array(positions.flat()),
    indices: new Uint16Array(indices),
    txrs: new Float32Array(txrsArr.flat()),
  };
}

export default {
  convert,
};
