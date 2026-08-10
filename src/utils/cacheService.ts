type CacheItem = {
  data: any;
  expiry: number;
};

export class CacheService {
  private static cache: Map<string, CacheItem> = new Map();

  static set(key: string, data: any, ttlSeconds: number = 300): void {
    const expiry = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { data, expiry });
  }

  static get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  static invalidatePattern(pattern: string): void {
    let clearedCount = 0;
    for (const key of this.cache.keys()) {
      if (key.includes(pattern)) {
        this.cache.delete(key);
        clearedCount++;
      }
    }
    console.log(
      ` [CACHE INVALIDATED] '${pattern}' ilə bağlı ${clearedCount} keş təmizləndi.`,
    );
  }

  static clear(): void {
    this.cache.clear();
    console.log("🧹 [CACHE CLEAR] Bütün keş təmizləndi.");
  }
}
