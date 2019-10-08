import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import App from './app.vue'
import createStore from './store/index'
import createRouter from './router/index'

import Notification from './components/notification'
import Tabs from './components/Tabs'

import './assets/styles/reset.css'
import './assets/styles/global.styl'

Vue.prototype.$eventBus = new Vue()

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Meta)
Vue.use(Notification)
Vue.use(Tabs)

export default () => {
  const router = createRouter();
  const store = createStore();

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}
