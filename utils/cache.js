// utils/cache.js
const redisClient = require('../libs/initRedis');

// 5 minutes default expiration
const DEFAULT_EXPIRATION = process.env.REDIS_EXPIRATION || 60 * 5;

/**
 * Get or set cache in Redis with automatic JSON serialization.
 * @param {string} key Redis cache key
 * @param {function} fetchFunction Function that fetches data if cache miss
 * @returns {Promise<any>} Cached or freshly fetched data
 */
exports.getOrSetCache = async (key, fetchFunction) => {
  try {
    const cached = await redisClient.get(key);
    if (cached) {
      console.log('Pulling from cache for key:', key);
      return JSON.parse(cached);
    }

    const data = await fetchFunction();
    await redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(data));
    console.log('Cache miss. Fetching and caching for key:', key);
    return data;
  } catch (err) {
    console.error('Redis cache error:', err.message);
    return fetchFunction(); // fallback
  }
};

/**
 * Delete Redis keys by pattern (useful for invalidating caches).
 * @param {string} pattern Pattern to match keys (e.g. 'divisions:*')
 */
exports.clearCacheByPattern = async (pattern) => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`🧹 Cleared cache for pattern: ${pattern}`);
    }
  } catch (err) {
    console.error('Cache clear error:', err.message);
  }
};
