import type { RouteRecordRaw } from 'vue-router'

/**
 * 动态路由：根据菜单动态创建路由
 * 步骤：
 * 1. 构建路由
 * 2. 根据菜单匹配路由
 * 3. router.addRoute 动态注册路由
 */

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []

  // 1. 构建路由
  /**
   * 动态获取所有的路由对象, 放到数组中
   * 路由对象都在独立的文件中
   * 从文件中将所有路由对象先读取数组中
   */

  // 1.1 读取router/main所有的ts文件：import.meta.glob()等价于require.context()
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })

  // 1.2 将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

// 2. 根据菜单匹配路由
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 1.加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []

  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      console.log(localRoutes)
      if (route) {
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu) firstMenu = subMenu
    }
  }
  return routes
}

/**
 *
 * @param userMenus 所有菜单
 * @param path 需要匹配的路径
 * @returns 匹配到的菜单
 */
export function mapPathToMenu(userMenus: any[], path: string) {
  for (const item of userMenus) {
    for (const subItem of item.children) {
      if (subItem.url === path) {
        return subItem
      }
    }
  }
}

/**
 *
 * @param userMenus 所有菜单
 * @param path 需要匹配的路径
 * @returns 面包屑数据数组
 */
interface IBreadCrumb {
  name: string
  path: string
}
export function mapPathToBreadCrumb(userMenus: any[], path: string) {
  // 1.定义面包屑
  const breadCrumb: IBreadCrumb[] = []

  // 2.遍历获取面包屑层级
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        // 1.顶层菜单
        breadCrumb.push({ name: menu.name, path: menu.url })
        // 2.匹配菜单
        breadCrumb.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadCrumb
}
