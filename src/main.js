import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Element)

new Vue({
  router,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this // 安装全局事件总线
  }
}).$mount('#app')