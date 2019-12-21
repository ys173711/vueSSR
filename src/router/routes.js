
export default [
  {
    path: '/app',
    component: () => import('../todo/todo.vue'),
    // props: true,
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
    path: '/',
    redirect: '/login'
  }
]
