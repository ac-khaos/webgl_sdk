precision mediump float;
uniform sampler2D texture1;
// varying vec2 out_texture;

void main() {
  gl_FragColor = texture2D(texture1, vec2(1.0, 1.0));
  // gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
}
