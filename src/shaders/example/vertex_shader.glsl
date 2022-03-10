precision mediump float;
attribute vec3 position;
attribute vec2 in_texture;
varying vec2 out_texture;
uniform mat4 rotatex_matrix;
uniform mat4 rotatey_matrix;
uniform mat4 rotatez_matrix;

void main() {
  gl_Position = rotatex_matrix * rotatey_matrix * rotatez_matrix * vec4(position, 1.0);
  out_texture = in_texture;
}
