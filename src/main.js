import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import store from '@/store/index.js'
import './permisson.js'
import './directives'
// import ElementUI from '@/components/element-ui.js'
import ElementUI from 'element-ui'
import './utils/layout.js'
import './utils/errorLog.js'
import './utils/constant.js'
import '@/style/style.scss'
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// console.log(Vue.config)
// console.log(Vue.config, 'vue')
