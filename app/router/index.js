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

Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: '',
    routes: [
        // { path: '/admin', component: AdminPanel, meta: {requiresAuth: true}},
        { path: '/', redirect: '/bindCard?id=50' }, // 默认路由
        { path: '/bindCard', component: bindCard },
        { path: '/home', component: home },
        { path: '/packagen', component: packagen },
        { path: '/packagem', component: packagem },
        { path: '/info', component: info },
        { path: '/record', component: record },
        { path: '/register', component: register },
        { path: '/recharge', component: recharge },
        { path: '/view', component: view },
        { path: '/password', component: password },
        { path: '/active', component: active },
        { path: '/order', component: order },
        { path: '/diagnose', component: diagnose },
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