import Router from 'vue-router';
import routes from './routes.js';
/*
const router = new Router({
  routers
});

export default router;
 */

export default () => {
  return new Router({
    routes,
    mode: 'history' // 依赖H5的history API和服务器配置
    // base: '/base/'
    // linkActiveClass: 'link-active',
    // linkExactActiveClass: 'link-exact-active'
    /* scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return {x: 0, y: 0};
      }
    } */
    /* parseQuery (query) {

    }, */
    /* stringifyQuery (obj) {

    } */
    /* meta: {
      title: 'this is app',
      description: 'details description'
    } */
    /* children: [
      {
        path: '',
        component:
      }
    ] */
  })
}
