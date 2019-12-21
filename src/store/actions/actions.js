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
  }
}
