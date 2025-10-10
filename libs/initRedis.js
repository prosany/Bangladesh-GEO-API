const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.bd_geo_REDIS_URL || 'redis://localhost:6379',
});

// Event listeners
redisClient.on('connect', () => {
  console.log('🟢 Redis: Connecting...');
});

redisClient.on('ready', () => {
  console.log('✅ Redis: Connected and ready to use.');
});

redisClient.on('end', () => {
  console.log('🔴 Redis: Disconnected.');
});

redisClient.on('reconnecting', () => {
  console.log('🟡 Redis: Reconnecting...');
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Error:', err.message);
});

// Connect Redis
(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Redis connection failed:', err.message);
  }
})();

module.exports = redisClient;
