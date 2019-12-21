export default {
  updateCountSync (state, val) {
    state.count = val;
  },
  //
  fillTodos (state, todos) {
    state.todos = todos
  },
  doLogin (state, data) {
    state.user = data
  }
};
