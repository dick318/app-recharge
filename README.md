# app-recharge

## 说明

> 基于webpack3+vue2+vueRouter2+Jquery的物联网卡流量的查询充值系统，完整实现了整个流程。

> 该项目为前后端分离的单页面项目。

> 如果该项目对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！

> 或者您可以 "follow" 一下，该项目将持续更新，不断完善功能。

> 如有问题或者好的建议可以在 Issues 中提。

## 前言

> 项目总后台管理系统的前端项目
[传送门](https://github.com/xwlaix/admin-manage)。
> 项目代理商后台管理系统的前端项目
[传送门](https://github.com/xwlaix/agent-manage)。

## 项目介绍

`app-recharge`是一个物联网卡流量的查询充值系统，基于移动端。
主要包括卡片查询、卡片充值、换卡管理、图文页面、消费记录、余额充值、密码管理、智能诊断、个人中心等功能。

## 项目演示

项目在线演示地址：[http://wx.szcoolfish.com/coolfish/tpl/main/dist/index.html#/bindCard?id=50](http://wx.szcoolfish.com/coolfish/tpl/main/dist/index.html#/bindCard?id=50)  

![https://github.com/xwlaix/app-recharge/blob/master/example.gif](https://github.com/xwlaix/app-recharge/blob/master/example.gif)

## 技术选型

技术 | 说明 | 官网
----|----|----
Vue | 前端框架 | [https://vuejs.org/](https://vuejs.org/)
Jquery | JavaScript库 | [http://jquery.com/](http://jquery.com/)
Vue-router | 路由框架 | [https://router.vuejs.org/](https://router.vuejs.org/)
nprogress | 进度条控件 | [https://github.com/rstacruz/nprogress](https://github.com/rstacruz/nprogress)

### 项目布局

``` lua
src -- 源码目录
├── css -- 全局css样式
├── font -- font字体文件
├── img -- 静态图片文件
├── js -- 引用类文件
├── router -- vue-router路由配置
└── components -- 前端页面，组件
    ├── App -- 首页
    ├── bindCard -- 查询充值入口
    ├── cardOrder -- 换卡订单详情
    ├── changeCard -- 换卡操作页面
    ├── changeCardList -- 换卡记录
    ├── diagnose -- 智能诊断（机卡解绑，开机）
    ├── find -- 找回密码
    ├── home -- 个人中心
    ├── index -- 查询充值入口
    ├── info -- 流量查询
    ├── order -- 订购套餐中转页面
    ├── packagem -- 月套餐订购
    ├── packagen -- 普通套餐订购
    ├── password -- 修改密码
    ├── recharge -- 余额充值
    ├── record -- 消费记录
    ├── register -- 实名认证
    └── view -- 图文渲染页面
webpack -- webpack配置目录
```

## 搭建步骤
- 下载node并安装：[https://nodejs.org/dist/v8.9.4/node-v8.9.4-x64.msi](https://nodejs.org/dist/v8.9.4/node-v8.9.4-x64.msi);
- 访问在线接口，具体位置为src/index.js文件中的javaWt等;
- 克隆源代码到本地，使用vscode打开，并完成编译;
- 在vscode命令行中运行命令：npm install,下载相关依赖;
- 在vscode命令行中运行命令：npm run dev,运行项目;
- 访问地址：[http://localhost:8080](http://localhost:8080) 即可打开页面;
- 如果遇到无法运行该命令，需要配置npm的环境变量，如在path变量中添加：C:\Users\zhenghong\AppData\Roaming\npm。

## 许可证

[MIT](https://github.com/xwlaix/agent-manage/blob/master/LICENSE)

Copyright (c) 2018-2019 xwlaix
