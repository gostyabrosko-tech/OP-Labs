export class Cache {
    constructor(limit = 5, ttl = 60000) {
        this.limit = limit;
        this.ttl = ttl;
        this.cache = new Map();
        this.timestamps = new Map();
    }
    get(key) {
        if (!this.cache.has(key)) return null;
        if (Date.now() - this.timestamps.get(key) > this.ttl) {
            this.delete(key);
            return null;
        }
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        this.timestamps.set(key, Date.now()); 
        return value;
    }
    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.limit) {
            const oldestKey = this.cache.keys().next().value;
            this.delete(oldestKey);
        }
        this.cache.set(key, value);
        this.timestamps.set(key, Date.now());
    }
    delete(key) {
        this.cache.delete(key);
        this.timestamps.delete(key);
    }
}
export function memoize(fn, limit = 3, ttl = 60000) {
    const cache = new Cache(limit, ttl);
    return (...args) => {
        const key = JSON.stringify(args);
        const cached = cache.get(key);
        if (cached !== null) return cached;

        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}