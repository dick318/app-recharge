import Vue from "vue";
import VueRouter from "vue-router";


const bindCard = r => require.ensure([], () => r(require('../components/bindCard.vue')), 'bindCard');
const bindCard = resolve => require(['../components/bindCard.vue'], resolve)

const home = r => require.ensure([], () => r(require('../components/home.vue')), 'home');
const packagem = r => require.ensure([], () => r(require('../components/packagem.vue')), 'packagem');
const packagen = r => require.ensure([], () => r(require('../components/packagen.vue')), 'packagen');
const info = r => require.ensure([], () => r(require('../components/info.vue')), 'info');
const record = r => require.ensure([], () => r(require('../components/record.vue')), 'record');
const recharge = r => require.ensure([], () => r(require('../components/recharge.vue')), 'recharge');
const register = r => require.ensure([], () => r(require('../components/register.vue')), 'register');
const view = r => require.ensure([], () => r(require('../components/view.vue')), 'view');
const password = r => require.ensure([], () => r(require('../components/password.vue')), 'password');
const active = r => require.ensure([], () => r(require('../components/active.vue')), 'view');
const order = r => require.ensure([], () => r(require('../components/order.vue')), 'order');
const diagnose = r => require.ensure([], () => r(require('../components/diagnose.vue')), 'diagnose');
// const pay = r => require.ensure([], () => r(require('../components/pay.vue')), 'pay');

Vue.use(VueRouter)

export default new VueRouter({
    linkActiveClass: '',
    routes: [
        // { path: '/admin', component: AdminPanel, meta: {requiresAuth: true}},
        { path: '/', redirect: '/bindCard' }, // 默认路由
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