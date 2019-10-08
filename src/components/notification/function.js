import Component from './func-notification'
import Vue from 'vue'

const NotificationConstructor = Vue.extend(Component)

const instances = [] // 保存已创建的instance列表
let seed = 1 // 生成组件id
const notify = (options) => {
  if (Vue.prototype.$isServer) return

  const {autoClose, ...rest} = options
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data () {
      return {
        autoClose: autoClose === undefined ? 3000 : autoClose
      }
    }
  })
  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount() // 生成el
  document.body.appendChild(instance.vm.$el) // 全局组件放在body下面

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instance.vm.visible = true
  instances.push(instance)

  const removeInstance = (instance) => {
    if (!instance) return
    const index = instances.findIndex(inst => instance.id === inst.id)
    if (index) {
      instances.splice(index, 1)
    }
    // 删除节点后重新计算它上面的节点高度
    let length = instances.length
    if (length < 1) return
    const removeHeight = instance.vm.height
    for (let i = index; i <= length - 1; i++) {
      instances[i].verticalOffset = instances[i].verticalOffset - removeHeight - 16
    }
  }
  instance.vm.$on('close', () => { // 删除节点
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el) // 删除真实dom节点
    instance.vm.$destroy() // 然后再删除对应dom节点的vm对象
  })

  return instance.vm
}

export default notify
