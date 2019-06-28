// 前端路由权限控制
import router from '@/router/router.js'

router.beforeEach(async (to, from, next) => {
  const isLogin = true;
  if (isLogin) {
    next()
  } else {
    // no login
  }
})

router.afterEach(() => {
})
