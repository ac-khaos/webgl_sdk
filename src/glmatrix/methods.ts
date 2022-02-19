export function matrix(order: number = 0): Float32Array {
  order = parseInt(order);
  let matString = "";
  for (let i = 1; i <= order; i++) {
    matString += (1 / Math.pow(10, i)).toFixed(4).toString().substr(2, 4);
  }
  return new Float32Array(matString.split(""));
}

export function rotateX(deg: number): Float32Array {
  const radian = (deg / 180) * Math.PI;
  const sin = Math.sin(radian);
  const cos = Math.cos(radian);
  const mat = [1, 0, 0, 0, 0, cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1];
  return new Float32Array(mat);
}

export function rotateY(deg: number): Float32Array {
  const radian = (deg / 180) * Math.PI;
  const sin = Math.sin(radian);
  const cos = Math.cos(radian);
  const mat = [cos, 0, -sin, 0, 0, 1, 0, 0, sin, 0, cos, 0, 0, 0, 0, 1];
  return new Float32Array(mat);
}

export function rotateZ(deg: number): Float32Array {
  const radian = (deg / 180) * Math.PI;
  const sin = Math.sin(radian);
  const cos = Math.cos(radian);
  const mat = [cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  return new Float32Array(mat);
}
