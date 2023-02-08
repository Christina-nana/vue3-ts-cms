import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/modules/login/login'
import type { IAcount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import type { RouteRecordRaw } from 'vue-router'

interface IStateType {
  id: string
  name: string
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): IStateType => ({
    id: '',
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
  }),
  actions: {
    async loginAccountAction(account: IAcount) {
      // 发送网络请求
      const res = await accountLoginRequest(account)
      this.id = res.data.id
      this.name = res.data.name
      this.token = res.data.token

      // 本地存储token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 跳转页面
      router.push('/main')

      // 获取用户信息
      const userInfoRes = await getUserInfoById(this.id)
      this.userInfo = userInfoRes.data
      localCache.setCache('userInfo', this.userInfo)

      // 获取菜单列表
      const userMenusRes = await getUserMenusByRoleId(this.id)
      this.userMenus = userMenusRes.data
      localCache.setCache('userMenus', this.userMenus)

      // 动态添加路由
      // 1. 构建路由
      const localRoutes: RouteRecordRaw[] = []

      // 1.1 读取router/main所有的ts文件：import.meta.glob()等价于require.context()
      const files: Record<string, any> = import.meta.glob('../../router/main/**/*.ts', {
        eager: true
      })

      // 1.2 将读取出来的路由放到localRoutes数组中
      for (const key in files) {
        const module = files[key].default
        localRoutes.push(module)
      }

      // 2. 根据菜单匹配路由
      const routes: RouteRecordRaw[] = []
      for (const menu of this.userMenus) {
        for (const subMenu of menu.children) {
          const route = localRoutes.find((item) => item.path === subMenu.url)
          if (route) {
            routes.push(route)
          }
        }
      }

      // 3. 菜单匹配到的路由动态添加注册
      routes.forEach((route) => {
        router.addRoute('Main', route)
      })
    }
  }
})

export { useLoginStore }
