const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
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
