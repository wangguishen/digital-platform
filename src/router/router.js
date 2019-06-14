import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [{
  path: '/',
  name: 'home',
  component: () => import('@/views/Home.vue'),
  children: [{
    path: '/about',
    component: r => require(['@/views/About.vue'], r)
  }]
}]

Vue.use(VueRouter)

export default new VueRouter({
  routes
})