import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/modules/login/login'
import type { IAcount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRoutes } from '@/utils/map-menus'

interface IStateType {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): IStateType => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
  }),
  actions: {
    async loginAccountAction(account: IAcount) {
      // 发送网络请求
      const res = await accountLoginRequest(account)
      const id = res.data.id
      this.token = res.data.token

      // 本地存储token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 获取用户信息
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data

      // 获取菜单列表
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusRes.data

      // 本地缓存用户信息和菜单
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenus', this.userMenus)

      // 重要: 动态的添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((item) => {
        router.addRoute('Main', item)
      })

      // 跳转页面
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 重要: 动态的添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((item) => {
        router.addRoute('Main', item)
      })
    }
  }
})

export { useLoginStore }
