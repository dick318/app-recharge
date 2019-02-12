import Vue from 'vue'
import APP from './components/App.vue'
import router from './router'
import NProgress from 'nprogress'; // Progress 进度条
import './css/jquery-weui.min.css'
import './css/weui.min.css'
import './css/we-more.css'
import './js/jquery-weui.min.js'
import './js/city-picker.min.js'
import 'nprogress/nprogress.css'; // Progress 进度条 样式
import Vant from 'vant';
import 'vant/lib/index.css';
// import 'element-ui/lib/theme-chalk/index.css';
// import VeeValidate from 'vee-validate';
let urlPrefix = document.location.protocol + '//' + window.location.host;
let javaPre = 'http://wx.szcoolfish.com/plat'
let javaTest = 'http://120.79.150.124:10010/'
let javaWY = 'http://47.106.39.59:8098'
let javaWt = 'http://wx.szcoolfish.com/api/'
// let javaWt = 'http://120.79.150.124:10010/'
if (urlPrefix == 'http://localhost:8080') {
    urlPrefix = 'http://tw.szcoolfish.com'
}


const $post = (url, data, reback, timeout) => {
    $.ajax({
        url: urlPrefix + url,
        data: data,
        type: 'post',
        async: true,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            $.hideLoading();
            if (errorThrown.status == 504) {
                $.toptip('系统繁忙，请稍后再试', 2000, "error");
            } else {
                $.toptip('请求失败', 2000, "error");
            }
        },
        timeout: timeout
    })
}
const $post2 = (url, data, reback, timeout) => {
    $.ajax({
        url: url,
        data: data,
        type: 'post',
        async: true,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            $.hideLoading();
            if (errorThrown.status == 504) {
                $.toptip('系统繁忙，请稍后再试', 2000, "error");
            } else {
                $.toptip('请求失败', 2000, "error");
            }
        },
        timeout: timeout
    })
}
const $get = (url, reback, timeout, error) => {
    $.ajax({
        url: urlPrefix + url,
        type: 'get',
        async: true,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            if (errorThrown.status == 504) {
                $.toptip('系统繁忙，请稍后再试', 2000, "error");
            } else {
                $.toptip('请求失败', 2000, "error");
            }
        },
        timeout: timeout
    })
}
const $getAsync = (url, reback, error) => {
    $.ajax({
        url: urlPrefix + url,
        type: 'get',
        async: false,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: error
    })
}
const $get2 = (url, reback, error) => {
    $.ajax({
        url: url,
        type: 'get',
        async: false,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: error
    })
}
const $postAsync = (url, data, reback, error) => {
    $.ajax({
        url: urlPrefix + url,
        data: data,
        type: 'post',
        async: false,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: error
    })
}

const accSub = (arg1, arg2) => {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg2 * m - arg1 * m) / m).toFixed(n);
}
const unique3 = (arr) => {
    var res = [];
    var json = {};
    let i = arr.length;
    while (i--) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
}
const contains = (arr, obj) => {
    let i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false
}

function getUrlParam(module) {
    var reg = new RegExp("(^|&)" + module + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return (r[2]);
    return ''; //返回参数值
}

function setTitle(title) {
    document.title = title;
    let userAgent = window.navigator.userAgent.toLowerCase();
    let isiOS = userAgent.indexOf('applewebkit') >= 0;
    let isWechat = userAgent.indexOf('micromessenger') >= 0;
    if (isiOS && isWechat) {
        let iframe = document.createElement('iframe');
        iframe.src = 'https://www.baidu.com/favicon.ico';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.onload = function () {
            setTimeout(function () {
                iframe.remove();
            }, 0)
        }
    }
}

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        setTitle(to.meta.title);
    }
    NProgress.start();
    $.closeModal();
    next();
    NProgress.done();
})


Vue.use(Vant);
router.afterEach(() => {
    $.hideLoading()
    NProgress.done(); // 结束Progress
});
new Vue({
    el: '#app',
    router,
    render: h => h(APP),
})
// Vue.use(VeeValidate);
module.exports = {
    contains: contains,
    unique3: unique3,
    $post: $post,
    $get2: $get2,
    $post2: $post2,
    $postAsync: $postAsync,
    $getAsync: $getAsync,
    $get: $get,
    getUrlParam: getUrlParam,
    accSub: accSub,
    javaTest,
    javaPre,
    javaWY,
    urlPrefix,
    // javaPreWt,
    javaWt
}