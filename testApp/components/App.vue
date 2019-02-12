<template>
  <router-view></router-view>
</template>
<style>
* {
  margin: 0;
  padding: 0;
}
ol,
ul {
  list-style: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: normal;
}

body {
  width: 100%;
  height: 100%;
  color: #4d4d4d;
  font-size: 14px;
  font-family: "Hiragino Sans GB", STHeiTi, "微软雅黑", Helvetica, sans-serif;
}
html,
body {
  width: 100%;
  height: 100%;
  font-family: "微软雅黑", "Microsoft YaHei";
}
input[type="text"],
input[type="button"] {
  outline: none;
  border: none;
  background: transparent;
}
#weui-prompt-input::-webkit-input-placeholder {
  color: #999;
}
a {
  text-decoration: none;
}
.hidden {
  display: none !important;
}
.goPage {
  display: flex;
}
.goPage {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#goRecharge {
  flex: 1;
}
#goRecharge {
  height: 50px;
  font-size: 15px;
  width: 100%;
  color: #fff;
  text-align: center;
  line-height: 50px;
  background-color: rgb(51, 166, 240);
}
@font-face {
  font-family: "icomoon";
  src: url("../font/icomoon.eot?f6fp8a");
  src: url("../font/icomoon.eot?f6fp8a#iefix") format("embedded-opentype"),
    url("../font/icomoon.ttf?f6fp8a") format("truetype"),
    url("../font/icomoon.woff?f6fp8a") format("woff"),
    url("../font/icomoon.svg?f6fp8a#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"],
[class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: "icomoon" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-qiehuan:before {
  content: "\e900";
}
.icon-saoyisao:before {
  content: "\e901";
}
.icon-shagnchuan:before {
  content: "\e902";
}
.icon-zhiyin:before {
  content: "\e903";
}
.icon-zhuyi:before {
  content: "\e904";
}
.llgt {
  -webkit-transform: rotate(-90deg);
  /* Firefox */
  -moz-transform: rotate(-90deg);
  /* Internet Explorer 滤镜写法*/
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
  color: #ffffff;
  font-size: 50px;
  margin-top: 50px;
}
.llgt_title {
  margin: 15px;
  color: #ffffff;
  letter-spacing: 2px;
  font-size: 20px;
}
.weui-dialog.weui-dialog--visible {
  border-radius: 8px !important;
}
.weui-dialog__hd {
  color: rgb(255, 255, 255) !important;
  background-color: rgb(51, 166, 240) !important;
  padding-bottom: 0.8em !important;
  padding-top: 0.8em !important;
}
.weui-dialog__bd {
  padding: 0.8em !important;
}
.weui-dialog__btn.primary {
  color: rgb(51, 166, 240) !important;
}
.weui-dialog__btn {
  font-size: 14px;
}
.weui-dialog__bd {
  min-height: auto !important;
  color: #0a0a0a !important;
}
.weui-toast{
  bottom:  45%!important;
}
.weui-toast.weui_loading_toast.weui-toast--visible {
  margin-left: 0 !important;
 bottom:50% !important;
}
.weui-toptips.bg-error.weui-toptips_visible {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
.weui-toast_content {
  font-size: 14px !important;
}
.weui-toast--text {
  min-height: 0 !important;
  font-size: 14px !important;
  margin-left: 0 !important;
  bottom:  50% !important;
}
#weui-prompt-input {
  padding: 0 !important;
}

.weui-icon-checked:before {
  color: rgb(51, 166, 240) !important;
}
.weui-cells {
  margin-top: 0 !important;
}
.weui-cells:after,
.weui-cells:before {
  height: 0 !important;
}
.weui-cells:before {
  border-top: 0 !important;
}
.weui-cells:after {
  border-bottom: 0 !important;
}
.weui-cell:before {
  height: 0 !important;
  border-top: 0 !important;
}
.weui-cells_radio {
  padding-left: 30px;
}
</style>

<script>
// import "../js/vconsole.js";

export default {
  data() {
    return {};
  }
};
</script>