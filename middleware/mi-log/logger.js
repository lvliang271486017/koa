const log4js = require('log4js');
const access = require("./access.js");
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]

// 提取默认公用参数对象
const baseInfo = {
    appLogLevel: 'debug',  // 指定记录的日志级别
    dir: 'logs',		// 指定日志存放的目录名
    env: 'dev',   // 指定当前环境，当为开发环境时，在控制台也输出，方便调试
    projectName: 'koa2-tutorial',  // 项目名，记录在日志中的项目信息
    serverIp: '0.0.0.0'		// 默认情况下服务器 ip 地址
}

module.exports = (options) => {
    const opts = Object.assign({}, baseInfo, options || {})
    const { env, appLogLevel, dir, serverIp, projectName } = opts
    // 增加常量，用来存储公用的日志信息
    const commonInfo = { projectName, serverIp }
    const contextLogger = {}
    const appenders = {
        cheese: {
            type: 'dateFile',
            filename: `${dir}/task`,
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    }
    
    if (env === "dev" || env === "local" || env === "development") {
        appenders.out = {
            type: "console"
        }
    }
    let config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    }

    const logger = log4js.getLogger('cheese');

    return async (ctx, next) => {
        const start = Date.now()

        log4js.configure(config);
        methods.forEach((method, i) => {
            contextLogger[method] = (message) => {
                logger[method](access(ctx, message, commonInfo))
            }
        })
        ctx.log = contextLogger;
        await next()
        const end = Date.now()
        const responseTime = end - start;
        logger.info(`响应时间为${responseTime / 1000}s`);
    }
}