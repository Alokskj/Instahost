import { Redis } from 'ioredis';
import _config from './_config';

const redis = new Redis({
    host: _config.redisURI,
    password: _config.redisPassword,
    port: Number(_config.redisPort),
});

// Event listener for Redis errors
redis.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
});

export default redis;
