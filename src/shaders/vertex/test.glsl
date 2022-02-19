attribute vec3 position;
attribute vec4 color;
uniform mat4 model_matrix;
varying vec4 frag_color;

void main() {
  gl_Position = model_matrix * vec4(position, 1.0);
  frag_color = color;
}
