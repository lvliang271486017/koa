const Path = require('path')
const nunjucks = require('nunjucks')

module.exports = (opts = {}) => {
    const folder = opts.errorPageFolder
    const templatePath = Path.rersolve(__dirname, './error.html')
    let fileName = 'other'
    return async (ctx, next) => {
        try {
            await next();
            /**
             * 如果没有更改过 response 的 status，则 koa 默认的 status 是 404 
             */
            if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
        } catch (e) {
            let status = parseInt(e.status)
            // 默认错误信息为 error 对象上携带的 message
            const message = e.message

            // 对 status 进行处理，指定错误页面文件名 
            if (status >= 400) {
                switch (status) {
                    case 400:
                    case 404:
                    case 500:
                        fileName = status;
                        break;
                        // 其它错误 指定渲染 other 文件
                    default:
                        fileName = 'other'
                }
            } else {
                status = 500
                fileName = status
            }
            const fileName = folder ? Path.join(folder, `${fileName}.html`) : templatePath

            // 渲染对应错误类型的视图，并传入参数对象
            try {
                // 指定视图目录
                nunjucks.configure(folder ? folder : __dirname)
                const data = await nunjucks.render(filePath, {
                    env: env, // 指定当前环境参数
                    status: e.status || e.message, // 如果错误信息中没有 status，就显示为 message
                    error: e.message, // 错误信息
                    stack: e.stack // 错误的堆栈信息
                })
                // 赋值给响应体
                ctx.status = status
                ctx.body = data
            } catch (e) {
                // 如果中间件存在错误异常，直接抛出信息，由其他中间件处理
                ctx.throw(500, `错误页渲染失败:${e.message}`)
            }
        }
    }
}