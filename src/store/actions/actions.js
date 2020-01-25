import model from '../../model/client-model'
import notify from '../../components/notification/function'
import bus from '../../util/bus'

const handleError = (error) => {
  if (error.code === 401) {
    notify({
      content: '请先登录！'
    })
    bus.$emit('auth')
  }
  if (error.code === 400) {
    notify({
      content: '账号密码错误！'
    })
  }
}

export default {
  //
  fetchTodos ({commit}) {
    model.getAllTodos()
      .then(data => {
        commit('fillTodos', data)
      })
      .catch(err => {
        handleError(err)
      })
  },
  login ({commit}, {username, password}) {
    return new Promise((resolve, reject) => {
      model.login(username, password)
        .then(data => {
          commit('doLogin', data)
          notify({
            content: '登录成功'
          })
          resolve()
        }).catch(err => {
          handleError(err)
          reject(err)
        })
    })
  },
  createTodo ({commit}, todo) {
    model.createTodo(todo)
      .then(data => {
        commit('createTodo', data)
        notify({
          content: '您新增一条待办事项'
        })
      }).catch(err => {
        handleError(err)
      })
  },
  updateTodo ({commit}, {id, todo}) {
    model.updateTodo(id, todo)
      .then(data => {
        commit('updateTodo', {id, todo: data})
        notify({
          content: '您更新了一条事项'
        })
      }).catch(err => {
        handleError(err)
      })
  },
  deleteTodo ({commit}, id) {
    model.deleteTodo(id)
      .then(data => {
        commit('deleteTodo', id)
        notify({
          content: '您删除了一条待办事项'
        })
      }).catch(err => {
        handleError(err)
      })
  },
  deleteAllCompleted ({commit, state}) {
    const ids = state.todos.filter(t => t.isCompleted).map(t => t.id)
    model.deleteAllCompleted(ids)
      .then(() => {
        commit('deleteAllCompleted')
        notify({
          content: '清理一下'
        })
      }).catch(err => {
        handleError(err)
      })
  }

}
