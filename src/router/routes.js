// import Todo from '../todo/todo.vue';
// import Login from '../login/login.vue';
// 改成异步加载组件的方式 结合 webpack支持分割代码codeSplitting
// 目前已无需再用babel-plugin-dynamic-import-webpack

export default [
  {
    path: '/app/:id',
    // component: Todo,
    components: {
      default: () => import('../todo/todo.vue'),
      a: () => import('../login/login.vue')
    },
    // props: true // 建议使用props的方式，避免组件内部使用$route，为了解耦让组件通用性更高
    // props: {id: '456'}
    props: {
      default: (route) => ({id: route.query.b}),
      a: true
    },
    beforeEnter: (to, from, next) => {
      console.log('beforeEnter invoked');
      next();
    }
  },
  {
    path: '/login',
    component: () => import('../login/login.vue'),
    name: 'login'
  },
  {
    path: '/login/exact',
    component: () => import('../login/login.vue')
  },
  {
    path: '/',
    redirect: '/login'
  }
]
