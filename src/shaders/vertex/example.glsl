precision mediump float;
attribute vec3 position;
attribute vec2 in_texture;
varying vec2 out_texture;
uniform mat4 matrix;

void main() {
  gl_Position = vec4(position, 1.0) * matrix;
  out_texture = in_texture;
}
