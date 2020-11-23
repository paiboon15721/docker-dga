const redis = require('redis')
const { promisify } = require('util')

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD || undefined,
})

client.on('error', console.error)

exports.redisClient = client
exports.redisGet = promisify(client.get).bind(client)
exports.redisSet = promisify(client.set).bind(client)
