const Router = require('koa-router')

const apiRouter = new Router({prefix: '/api'});

// 为了让前端方便判断，需要给统一格式
const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter
  // 获取所有todos列表
  .get('/todos', async (ctx) => {
    const todos = await ctx.db.getAllTodos()
    ctx.body = successResponse(todos)
  })
  // 新增一个todo
  .post('/todo', async (ctx) => {
    const data = await ctx.db.addTodo(ctx.request.body)
    ctx.body = successResponse(data)
  })
  // 更新一个todo
  .put('/todo/:id', async (ctx) => {
    const data = await ctx.db.updateTodo(ctx.params.id, ctx.request.body)
    ctx.body = successResponse(data)
  })
  // 删除一个todo
  .delete('/todo/:id', async (ctx) => {
    const data = await ctx.db.deleteTodo(ctx.params.id)
    ctx.body = successResponse(data)
  })
  // 删除所有已完成的todo
  .post('/delete/completed', async (ctx) => {
    const data = await ctx.db.deleteCompleted(ctx.request.body.ids)
    ctx.body = successResponse(data)
  })

module.exports = apiRouter
