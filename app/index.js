import Vue from 'vue'
import APP from './components/App.vue'
import router from './router'
import NProgress from 'nprogress'; // Progress 进度条

import './css/jquery-weui.min.css'
import './css/weui.min.css'
import './css/we-more.css'
import './js/jquery-weui.min.js'
import 'nprogress/nprogress.css'; // Progress 进度条 样式
// import 'element-ui/lib/theme-chalk/index.css';
// import VeeValidate from 'vee-validate';
let urlPrefix = document.location.protocol + '//' + window.location.host;
if (urlPrefix == 'http://localhost:8080') {
    urlPrefix = 'http://tw.szcoolfish.com'
}
const $post = (url, data, reback, timeout, error) => {
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
            if(errorThrown.status == 504){
                $.toptip('系统繁忙，请稍后再试', 2000, "error");
            }else{
                $.toptip('请求失败', 2000, "error");
            }
        },
        timeout: timeout
    })
}
const $post2 = (url, data, reback, error) => {
    $.ajax({
        url: 'http://wx.szcoolfish.com' + url,
        data: data,
        type: 'post',
        async: true,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        success: reback,
        error: error
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
            if(errorThrown.status == 504){
                $.toptip('系统繁忙，请稍后再试', 2000, "error");
            }else{
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
        url:url,
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
router.beforeEach((to, from, next) => {
    NProgress.start();
    $.closeModal();
    $.hideLoading()
    next();
    NProgress.done();
})

router.afterEach(() => {
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
    accSub: accSub
}