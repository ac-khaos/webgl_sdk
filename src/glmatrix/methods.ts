export function matrix(order: Number = 0): Float32Array {
  order = parseInt(order);
  let matString = "";
  for (let i = 1; i <= order; i++) {
    matString += (1 / Math.pow(10, i)).toFixed(4).toString().substr(2, 4);
  }
  return new Float32Array(matString.split(""));
}

export function rotateX(deg: Number): Float32Array {
  const radian = (deg / 180) * Math.PI;
  const sin = Math.sin(radian);
  const cos = Math.cos(radian);
  return new Float32Array([
    1, 0, 0, 0,
    0, cos, sin, 0,
    0, -sin, cos, 0,
    0, 0, 0, 1,
  ]);
}

export function rotateY(deg: Number): Float32Array {
  const radian = (deg / 180) * Math.PI;
  const sin = Math.sin(radian);
  const cos = Math.cos(radian);
  return new Float32Array([
    cos, 0, -sin, 0,
    0, 1, 0, 0,
    sin, 0, cos, 0,
    0, 0, 0, 1,
  ]);
}

export function rotateZ(deg: Number): Float32Array {
  const radian = (deg / 180) * Math.PI;
  const sin = Math.sin(radian);
  const cos = Math.cos(radian);
  return new Float32Array([
    cos, sin, 0, 0,
    -sin, cos, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]);
}

export function rotate(degX: Number, degY: Number, degZ: Number): Float32Array {
  const radianX = (degX / 180) * Math.PI;
  const radianY = (degX / 180) * Math.PI;
  const radianZ = (degX / 180) * Math.PI;
}
