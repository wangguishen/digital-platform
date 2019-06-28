import Vue from 'vue'
import VueRouter from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/layout.vue'),
    children: [{
      path: '/system-param/data-dictionary',
      component: r => require(['@/views/system-param/data-dictionary/index.vue'], r),
      name: 'dataDictionary'
    }, {
      path: '/system-param/error-code',
      name: 'errorCode',
      component: r => require(['@/views/system-param/error-code/index.vue'], r)
    }, {
      path: '/system-param/system-parameter',
      name: 'systemParameter',
      component: r => require(['@/views/system-param/system-parameter.vue'], r)
    }, {
      path: '/system-manage/jurisdiction',
      name: 'jurisdiction',
      component: r => require(['@/views/system-manage/jurisdiction/index.vue'], r)
    }, {
      path: '/system-manage/user-manage',
      name: 'userManage',
      component: r => require(['@/views/system-manage/user-manage/index.vue'], r)
    }, {
      path: '/system-manage/role-manage',
      name: 'roleManage',
      component: r => require(['@/views/system-manage/role-manage/index.vue'], r)
    }, {
      path: '/system-manage/resource-manage',
      name: 'resourceManage',
      component: r => require(['@/views/system-manage/resource-manage/index.vue'], r)
    }, {
      path: '/system-param/simulate',
      name: 'simulate',
      component: r => require(['@/views/system-param/simulate.vue'], r)
    }, {
      path: '/iframe/:url',
      name: 'iframe',
      component: () => import('@/views/iframe/index.vue')
    }]
  },
  {
    path: '/404',
    component: () => import('@/views/err/404.vue')
  },
  {
    path: '/50X',
    component: () => import('@/views/err/50X.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

Vue.use(VueRouter)

export default new VueRouter({
  routes
})
