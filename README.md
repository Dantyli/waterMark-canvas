纯前端实现图片添加水印:</br>
图片上传预览压缩的思路在Multi-picture-compression-and-Preview项目中有详解<br>
添加水印的实现思路:在第一次执行drawImage()后,再增加图层绘制水印图片或文字<br>
globalAlpha设置水印的不透明度,默认设置是0.6<br>
demo中增加是否支持html5拾色器的判断,自动匹配拾色器和颜色选择器<br>
上传图片添加水印后支持直接下载
