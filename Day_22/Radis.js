const redis = require('redis');
const redisClient = redis.createClient({
    username: 'default',
    password: ' ',
    socket: {
        host: ' ',
        port: s
    }
});
module.exports = redisClient;
