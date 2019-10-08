import Notification from './notification.vue'

export default {
  extends: Notification,
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px` // 在实例化此组件时添加了属性
      }
    }
  },
  data () {
    return {
      verticalOffset: 0, // 声明属性
      autoClose: 0, // 声明属性
      visible: false, // 声明属性，注意这里，我们的模板notification.vue的visible是true，我们继承的此组件类如果也为true则不会触发transition
      height: 0 // 在transition动画结束后取到值
    }
  },
  mounted () {
    this.createTimer()
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose);
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter () { // 覆盖父类此方法
      // debugger // eslint-disable-line
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestroy () {
    this.clearTimer()
  }
}
