require('dotenv').config()
const Koa = require('koa')
const Router = require('@koa/router')
const { redisGet, redisSet } = require('./connections/redis')
const pgClient = require('./connections/postgres')

const app = new Koa()
const r = new Router()

r.get('/', async ctx => {
  ctx.body = 'Demo DGA Application API'
})

r.get('/redis/set/:key/:value', async ctx => {
  const { key, value } = ctx.params
  const result = await redisSet(key, value)
  ctx.body = result
})

r.get('/redis/get/:key', async ctx => {
  const { key } = ctx.params
  const result = await redisGet(key)
  ctx.body = result
})

r.get('/pg/:table', async ctx => {
  const { table } = ctx.params
  const { rows } = await pgClient.query(`SELECT * FROM ${table}`)
  ctx.body = rows
})

app.use(r.routes())

pgClient.connect().then(() => {
  console.log('Connect to postgres success')
  app.listen(3000, () => console.log('App listening on port 3000'))
})
