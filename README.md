## 说明

使用 html2canvas 和 canvas2image 把网页绘制成图片

## 使用

```
npm install html2canvas
```

把代拷贝到 utils 文件夹下，在需要绘制的页面

```
import createImg from "@/utils/createImg";

setTimeout(() => {
    createImg.drawCanvas(".result");
}, 0);
```

tips: 会在页面最上面顶层创建一个 img 图片，所以点击返回，需要清除 img

```
const img = document.querySelector("body>img");
const body = document.querySelector("body");
body.removeChild(img);
```

## 最后

代码中有详细注释，有需要可以自行修改
