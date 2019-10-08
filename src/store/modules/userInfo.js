export default {
  namespaced: true,
  state: {
    username: 'ysys',
    password: '223344'
  },
  getters: {
    info (state, getters, rootState) {
      return rootState.copyright + state.username + state.password;
    }
  }
}
