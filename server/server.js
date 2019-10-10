const Koa = require('koa');
const send = require('koa-send')
const path = require('path')
const staticRouter = require('./routes/static')
const apiRouter = require('./routes/api')
const createDb = require('./db/db')
const config = require('../app.config')
const koaBody = require('koa-body')

const db = createDb(config.db.appId, config.db.appKey)

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development';

app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`);
    await next();
  } catch (error) {
    console.log(error);
    ctx.status = 500;
    if (isDev) {
      ctx.body = error.message;
    } else {
      ctx.body = 'please try again later';
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

app.use(koaBody())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routes/dev-ssr')
} else {
  pageRouter = require('./routes/ssr')
}
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3333;

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`);
})
