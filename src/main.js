import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/index.js'
import './permisson.js'
import FullCalendr from 'vue-fullcalendar'
Vue.use(FullCalendr)
// import ElementUI from 'element-ui';
// import iView from 'iview';
import iView from '@/components/iview.js'
import 'iview/dist/styles/iview.css';


import vFilters from './filters/vFilters.js'
for (const key in vFilters) {
  Vue.filter(key, vFilters[key])
}
Vue.use(iView);


// Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
