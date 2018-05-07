const router = require('koa-router')()
const HomeServer = require('../service/home')

module.exports = {
  index: async (ctx, next) => {
    ctx.response.body = `<h1>index</h1>`
  },
  home: async (ctx, next) => {
    console.log(ctx.request.qurey)
    console.log(ctx.request.qureystring)    
    ctx.response.body = `<h1>home</h1>`
  },
  homeParams: async (ctx, next) => {
    console.log(ctx.params)
    ctx.response.body = `<h1>home/:id/:name</h1>`
  },
  login: async (ctx, next) => {
    ctx.response.body =
      `
          <form action="/user/register" method="post">
            <input name="name" type="text" placeholder="请输入用户名：ikcamp"/> 
            <br/>
            <input name="password" type="text" placeholder="请输入密码：123456"/>
            <br/> 
            <button>GoGoGo</button>
          </form>
        `
  },
  register: async (ctx, next) => {
    let {
      name,
      password
    } = ctx.request.body
    let data = await HomeServer.register(name, password)

    ctx.response.body = data
  },
  404: async (ctx, next) => {
    ctx.response.body = `<h1>404</h1>`
  }

}