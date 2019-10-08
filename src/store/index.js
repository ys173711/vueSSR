import Vuex from 'vuex';
import userInfo from './modules/userInfo.js'
import state from './state/state.js';
import getters from './getters/getters.js';
import mutations from './mutations/mutations.js';
import actions from './actions/actions.js';

const isDev = process.env.NODE_ENV === 'development';

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 启用vuex严格模式
    state,
    mutations,
    getters,
    actions,
    modules: {
      a: userInfo
    },
    plugins: [
      (store) => {
        console.log('my vuex-plugin invoked');
      }
    ]
  })

  // 热重载
  if (module.hot) { // webpack的Hot Module Replacement API
    module.hot.accept(['./state/state.js', './getters/getters.js', './mutations/mutations.js', './actions/actions.js'], () => {
      const newState = require('./state/state.js').default;
      const newGetters = require('./getters/getters.js').default;
      const newMutations = require('./mutations/mutations.js').default;
      const newActions = require('./actions/actions.js').default;

      store.hotUpdate({
        state: newState,
        getters: newGetters,
        mutations: newMutations,
        actions: newActions
      })
    })
  }

  return store;
}
