enum CacheType {
  Local,
  Session
}

class createCache {
  storage: Storage
  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  removeCache(key: string) {
    this.storage.removeItem(key)
  }
  clear() {
    this.storage.clear()
  }
}

export const localCache = new createCache(CacheType.Local)
export const sessionCache = new createCache(CacheType.Session)
