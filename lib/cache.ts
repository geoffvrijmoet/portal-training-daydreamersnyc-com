interface CacheItem<T> {
  value: T
  timestamp: number
}

class Cache<T> {
  private cache: Map<string, CacheItem<T>> = new Map()
  private ttl: number // Time to live in milliseconds

  constructor(ttlMinutes: number = 60) {
    this.ttl = ttlMinutes * 60 * 1000
  }

  set(key: string, value: T): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    })
  }

  get(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    const isExpired = Date.now() - item.timestamp > this.ttl
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  clear(): void {
    this.cache.clear()
  }
}

// Create a singleton instance for product images
export const productImageCache = new Cache<string>(60) // Cache for 1 hour 