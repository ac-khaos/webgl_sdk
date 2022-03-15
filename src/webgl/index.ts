export interface ViewportConfig {
  width: number;
  height: number;
  // 抗锯齿
  antialias?: boolean;
  // 视口位置
  viewport?: [x: number, y: number, width: number, height: number];
  // depth_test
  depathTest?: boolean;
  // 初始视口颜色
  primaryColor?: Array<number>;
}

class WebGL {
  public gl: WebGL2RenderingContext;
  constructor(
    canvasElement: HTMLCanvasElement,
    viewportConfig: ViewportConfig
  ) {
    let glwidth = viewportConfig.width;
    let glheight = viewportConfig.height;
    canvasElement.style.width = glwidth + "";
    canvasElement.style.height = glheight + "";
    const webgl: WebGL2RenderingContext = canvasElement.getContext("webgl2");
    if (viewportConfig.antialias && window.devicePixelRatio) {
      glwidth *= window.devicePixelRatio;
      glheight *= window.devicePixelRatio;
    }
    webgl.canvas.width = glwidth;
    webgl.canvas.height = glheight;
    const viewportParams = viewportConfig.viewport || [0, 0, glwidth, glheight];
    webgl.viewport(...viewportParams);
    if (viewportConfig.depathTest) {
      webgl.enable(webgl.DEPTH_TEST);
    }
    if (viewportConfig.primaryColor) {
      webgl.clearColor(...viewportConfig.primaryColor);
    }
    console.log("webgl: ", webgl);
    this.gl = webgl;
  }
        
  // 加载并编译着色器
  shaderLoader(
    shaderType: number,
    shaderSource: string
  ): WebGLShader {
    const shader = this.gl.createShader(shaderType);
    this.gl.shaderSource(shader, shaderSource);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      throw new Error("An error occurred compiling the shaders: " + this.gl.getShaderInfoLog(shader));
    }
    return shader;
  }
}

// 图片加载
export function imageLoader(imageSrc: string) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onerror = () => {
      reject(`${imageSrc} 加载失败!`);
    };
    image.onload = () => {
      resolve(image);
    };
  });
  
}

// 纹理加载器
export function texturesLoader(webgl, textures) {
}

export default WebGL;
