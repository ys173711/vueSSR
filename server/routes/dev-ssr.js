const Router = require('koa-router');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');

const serverConfig = require('../../build/webpack.config.server');
const serverRender = require('./server-render');

const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;

let bundle;
serverCompiler.watch({}, (error, stats) => {
  if (error) throw error;
  stats = stats.toJson(); // ESlint的错误会在stats中
  stats.errors.forEach(err => console.log(err));
  stats.warnings.forEach(warn => console.warn(warn));

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json' // VueServerPlugin默认输出文件名，可以在此插件指定输出文件名
  );
  console.log(bundlePath);
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8')); // uft-8编码把二进制转换成全字符串
  console.log('webpack正在编译打包~');
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '稍等一下';
    return;
  }

  const clientManifestResp = await axios.get('http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'); // 请求我们的客户端渲染的开发服务器拿到dist目录下生成的vue-ssr-client-manifest.json文件
  const clientManifest = clientManifestResp.data;

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8');

  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false, // 官方默认注入必须按照模板格式，限制很大，所以我们不用
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router();
router.get('*', handleSSR);

module.exports = router;
