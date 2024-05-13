import { Redis } from 'ioredis';
import _config from './_config';

const redis = new Redis(_config.redisURI as string);

// Event listener for Redis connection
redis.on('connect', () => {
    console.log('Redis connected');
});

// Event listener for Redis errors
redis.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

export default redis;
