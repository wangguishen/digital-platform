import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/index.js'
import './permisson.js'
import vFilters from './filters/vFilters.js'
for (let key in vFilters) {
	Vue.filter(key, vFilters[key])
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
