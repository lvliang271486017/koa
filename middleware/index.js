const path = require('path')
const bodyparser = require('koa-bodyparser')
const nunjuncks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')
const ip = require('ip')

const miSend = require('./mi-send')
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error')

module.exports = (app) => {
    app.use(miHttpError())
    app.use(miLog({
        appLogLevel: 'debug',  // 指定记录的日志级别
        dir: 'logs',		// 指定日志存放的目录名
        env: 'dev',   // 指定当前环境，当为开发环境时，在控制台也输出，方便调试
        projectName: 'koa2-tutorial',  // 项目名，记录在日志中的项目信息
        serverIp: ip.address()		// 默认情况下服务器 ip 地址
    }))

    app.use(staticFiles(path.resolve(__dirname, '../public')))

    app.use(nunjuncks({
        ext: 'html',
        path: path.join(__dirname, '../views'),
        nunjucksConfig: {
            trimBlocks: true
        }
    }))

    app.use(bodyparser())
    app.use(miSend())
}