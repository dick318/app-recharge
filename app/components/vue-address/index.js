import VueAddress from './vue-address.vue' // 导入组件
const option = {
  install(Vue, options) {
    Vue.component(VueAddress.name, VueAddress)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueAddress)
}
export default option
