import { createRouter, createWebHashHistory } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 动态添加路由
// router.addRoute('Main', {
//   path: 'system/user',
//   component: () => import('../views/main/system/user/user.vue')
// })

// 路由拦截
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  // 重定向到第一个子路由
  if (to.path === '/main' && token) {
    return firstMenu.url
  }
})

export default router
