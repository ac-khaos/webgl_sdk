export interface ViewportConfig {
  width: number;
  height: number;
  antialias?: boolean;
  viewport?: [x: number, y: number, width: number, height: number];
}

export interface VectexDescribe {
  vertex: Float32Array;
  color?: Float32Array;
  texture?: Float32Array;
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
  return webgl;
}

// 加载并编译着色器
export function loadShader(
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

// 格式化顶点数据
export function formatVertexArray(vectexDescribes: Array<VectexDescribe> = []): Float32Array {
  let float32Vertices = new Float32Array(
    vectexDescribes.reduce((arr, describe) => {
      return arr.concat(describe.vertex, describe.color, describe.texture);
    }, [])
  );
  return float32Vertices;
}
