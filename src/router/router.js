import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '/',
        name: 'about',
        component: r => require(['@/views/About.vue'], r)
      }, {
        path: '/notebook',
        name: 'notebook',
        component: r => require(['@/views/notebook/index.vue'], r)
      }
    ]
  }
]

Vue.use(VueRouter)

export default new VueRouter({
  routes
})
