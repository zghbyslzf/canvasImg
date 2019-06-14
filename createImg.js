import html2canvas from "html2canvas";
import canvas2image from "@/utils/canvas2image";

export default class createImg {
  constructor() {
    this.dom = null;
    this.w = null;
    this.y = null;
  }

  // 获取手机的dpr
  static dpr() {
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
      return window.devicePixelRatio;
    }
    return 1;
  }

  // 将传入的数值转为整数
  static parseValue(value) {
    return parseInt(value, 10);
  }

  // 绘制把html生成图片
  static async drawCanvas(name) {
    this.dom = document.querySelector(name);
    const box = window.getComputedStyle(this.dom);

    // 获取dom节点后计算宽高
    this.w = this.parseValue(box.width);
    this.y = this.parseValue(box.height);

    // 获取缩放比例
    const scaleBy = this.dpr();

    // 创建一个canvas节点
    const canvas = document.createElement("canvas");

    // 设置canvas宽高，宽高 * 缩放比
    canvas.width = this.w * scaleBy;
    canvas.height = this.y * scaleBy;

    // 放大后再缩小，提高清晰度
    canvas.getContext("2d").scale(scaleBy, scaleBy);

    // 设置html2canvas方法的配置
    const opts = {
      scale: scaleBy, // 添加的scale 参数
      canvas: this.canvas, //自定义 canvas
      // allowTaint: true, //允许画布上有跨域图片 不建议使用 后面详细补充
      // logging: true, //日志开关，便于查看html2canvas的内部执行流程
      width: this.w, //dom 原始宽度
      height: this.y,
      useCORS: true // 【重要】开启跨域配置
    };

    // 开始转化为canvs对象
    html2canvas(this.dom, opts).then(canvas => {
      const context = canvas.getContext("2d");
      // 【重要】关闭抗锯齿
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;

      // 【重要】默认转化的格式为jpeg,也可设置为其他格式
      const img = canvas2image.convertToImage(
        canvas,
        canvas.width,
        canvas.height,
        "jpeg"
      );

      // 设置图片的css，放到最上面
      img.style.width = "100vw";
      img.style.height = "100vh";
      img.style.position = "absolute";
      img.style.top = 0;
      img.style.left = 0;
      img.style.zIndex = 999;

      //转化后放哪 放到body下面
      const body = document.querySelector("body");
      body.appendChild(img);
    });
  }
}
