import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: r => require(['@/views/login/index.vue'], r)
  },
  {
    path: '/',
    name: 'home',
    component: r => require(['@/views/home/index.vue'], r),
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
