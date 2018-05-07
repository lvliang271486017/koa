const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router')

app.use(bodyparser())

router(app)

app.listen(3000, () => {
    console.log('server start at http://localhost:3000')
})