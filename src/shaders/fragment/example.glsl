precision mediump float;
uniform sampler2D texture1;
varying vec2 out_texture;

void main() {
  gl_FragColor = texture2D(texture1, out_texture);
}
