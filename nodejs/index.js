const Koa = require('koa')
const Router = require('@koa/router')
const app = new Koa()
const r = new Router()

r.get('/', async ctx => {
  ctx.body = 'Demo DGA Application API'
})

app.use(r.routes())

app.listen(3000, () => console.log('App listening on port 3000'))