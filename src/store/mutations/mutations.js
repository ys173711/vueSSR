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
  },
  createTodo (state, data) {
    state.todos.unshift(data)
  },
  updateTodo (state, {id, todo}) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id),
      1,
      todo
    )
  },
  deleteTodo (state, id) {
    state.todos.splice(
      state.todos.findIndex(t => t.id === id),
      1
    )
  },
  deleteAllCompleted (state) {
    state.todos = state.todos.filter(t => !t.isCompleted)
  }

};
