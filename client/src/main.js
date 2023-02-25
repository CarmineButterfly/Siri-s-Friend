import Vue from 'vue'
import App from './App.vue'
//移入vuex状态管理库
import store from '@/store'
//完整引入element-ui及其样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局注册elementUI插件
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
