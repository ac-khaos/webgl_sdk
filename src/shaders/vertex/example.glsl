precision mediump float;
attribute vec3 position;
attribute vec2 in_texture;
varying vec2 out_texture;

void main() {
  gl_Position = vec4(position, 1.0);
  out_texture = in_texture;
}
