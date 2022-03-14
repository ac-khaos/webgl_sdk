export interface ViewportConfig {
  width: number;
  height: number;
  antialias?: boolean;
  viewport?: [x: number, y: number, width: number, height: number];
}

// 创建webgl
export function create(
  canvasElement: HTMLCanvasElement,
  viewportConfig: ViewportConfig
): WebGL2RenderingContext {
  canvasElement.style.width = viewportConfig.width + "";
  canvasElement.style.height = viewportConfig.height + "";
  const webgl: WebGL2RenderingContext = canvasElement.getContext("webgl2");
  if (viewportConfig.antialias && window.devicePixelRatio) {
    const glwidth: number = viewportConfig.width * window.devicePixelRatio;
    const glhegiht: number = viewportConfig.height * window.devicePixelRatio;
    webgl.canvas.width = glwidth;
    webgl.canvas.height = glhegiht;
    const viewportParams = viewportConfig.viewport || [0, 0, glwidth, glhegiht];
    webgl.viewport(...viewportParams);
  }
  console.log("webgl: ", webgl);
  return webgl;
}

// 加载并编译着色器
export function shaderLoader(
  webgl: WebGL2RenderingContext,
  shaderType: number,
  shaderSource: string
): WebGLShader {
  const shader = webgl.createShader(shaderType);
  webgl.shaderSource(shader, shaderSource);
  webgl.compileShader(shader);
  if (!webgl.getShaderParameter(shader, webgl.COMPILE_STATUS)) {
    throw new Error("An error occurred compiling the shaders: " + webgl.getShaderInfoLog(shader));
  }
  return shader;
}

// 纹理加载器
export function texturesLoader(webgl, textures) {
  const textutesImports = textures.map((texture) => import(`${texture.source}`));
  Promise.all(textutesImports).then((imps) => {
    console.log("ssssss------", imps);
  });
}


