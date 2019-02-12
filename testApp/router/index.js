import Vue from "vue";
import VueRouter from "vue-router";


const bindCard = resolve => require(['../components/bindCard.vue'], resolve)
const home = resolve => require(['../components/home.vue'], resolve)
const packagem = resolve => require(['../components/packagem.vue'], resolve)
const packagen = resolve => require(['../components/packagen.vue'], resolve)
const info = resolve => require(['../components/info.vue'], resolve)
const record = resolve => require(['../components/record.vue'], resolve)
const recharge = resolve => require(['../components/recharge.vue'], resolve)
const register = resolve => require(['../components/register.vue'], resolve)
const view = resolve => require(['../components/view.vue'], resolve)
const password = resolve => require(['../components/password.vue'], resolve)
const active = resolve => require(['../components/active.vue'], resolve)
const order = resolve => require(['../components/order.vue'], resolve)
const diagnose = resolve => require(['../components/diagnose.vue'], resolve)
const find = resolve => require(['../components/find.vue'], resolve)
const changeCard = resolve => require(['../components/changeCard.vue'], resolve)
const changeCardList = resolve => require(['../components/changeCardList.vue'], resolve)
const index = resolve => require(['../components/index.vue'], resolve)
const cardOrder = resolve => require(['../components/cardOrder.vue'], resolve)

Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: '',
    routes: [
        // { path: '/admin', component: AdminPanel, meta: {requiresAuth: true}},
        { path: '/', redirect: '/bindCard?id=50', meta: {title: '查询充值'}}, // 默认路由
        { path: '/bindCard', component: bindCard , meta: {title: '查询充值'}},
        { path: '/home', component: home , meta: {title: '个人中心'}},
        { path: '/packagen', component: packagen , meta: {title: '流量订购'}},
        { path: '/packagem', component: packagem , meta: {title: '流量订购'}},
        { path: '/info', component: info , meta: {title: '流量查询'}},
        { path: '/record', component: record , meta: {title: '消费记录'}},
        { path: '/register', component: register, meta: {title: '实名认证'} },
        { path: '/recharge', component: recharge , meta: {title: '余额充值'}},
        { path: '/view', component: view , meta: {title: '图文回复'}},
        { path: '/password', component: password , meta: {title: '修改密码'}},
        { path: '/find', component: find , meta: {title: '找回密码'}},
        { path: '/active', component: active , meta: {title: '卡片激活'}},
        { path: '/order', component: order , meta: {title: '订购套餐中'}},
        { path: '/diagnose', component: diagnose , meta: {title: '智能诊断'}},
        { path: '/changeCard', component: changeCard , meta: {title: '换卡'}},
        { path: '/changeCardList', component: changeCardList , meta: {title: '换卡记录'}},
        { path: '/cardOrder', component: cardOrder , meta: {title: '换卡详情'}},
        { path: '/index', component: index , meta: {title: '查询充值'}},
        // { path: '/pay', component: pay },
        // {
        //     path: '*',
        //     redirect: '/bindCard'
        // },
        {
         path: '*', component: {
         template: '<div>抱歉，没有您要的页面。</div>'
            }
        }
    ]
})
