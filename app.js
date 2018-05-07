const Koa = require('koa')
const path = require('path')
const bodyparser = require('koa-bodyparser')
const nunjuncks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')

const app = new Koa()
const router = require('./router')

app.use(staticFiles(path.resolve(__dirname, './public')))

app.use(nunjuncks({
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true
    }
}))

app.use(bodyparser())
router(app)

app.listen(3000, () => {
    console.log('server start at http://localhost:3000')
})