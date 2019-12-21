const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

/* userRouter.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE")
  await next()
}) */

userRouter.post('/login', async ctx => {
  // 处理前端 405 Method Not Allowed
  // ctx.response.headers('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
  // ctx.set('Access-Control-Allow-Methods', 'POST, OPPTIONS')
  const user = ctx.request.body
  if (user.username === 'yangsen' && user.password === 'ys173711') {
    // 登录成功
    ctx.session.user = {
      username: 'yangsen'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'yangsen'
      }
    }
  } else {
    // 登录失败
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
