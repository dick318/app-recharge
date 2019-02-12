# app-recharge
simple application with webpack3+vue2+vueRouter2+Jquery
移动端对于物联网卡流量的查询充值。

开发
# 克隆项目
git clone https://github.com/xwlaix/app-recharge.git

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
浏览器访问 http://localhost:8080

发布
# 构建测试环境
npm run prodBuild

# 构建生产环境
npm run build
其它
# --分支本地测试
npm run testdev

# --分支生产
npm run dist

# --分支测试
npm run test

# --分支发布
npm run prod

