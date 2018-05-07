const router = require('koa-router')()
const HomeServer = require('../service/home')

module.exports = {
  index: async (ctx, next) => {
    await ctx.render('home/index', {
      title: '欢迎你回来'
    })
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
    await ctx.render('home/login', {
      btnName: 'Go'
    })
  },
  register: async (ctx, next) => {
    let { name, password } = ctx.request.body
    let res = await HomeServer.register(name, password)

    if(res.status == "-1"){
      await ctx.render("home/login", res.data)
    }else{
      ctx.state.title = "个人中心"
      await ctx.render("home/success", res.data)
    }
  },
  404: async (ctx, next) => {
    ctx.response.body = `<h1>404</h1>`
  }

}