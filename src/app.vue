<template>
    <div id="app">
        <div class="cover"></div>
        <Header></Header>
        <!-- <button @click="notify">click me</button>
        <router-link to="/app/123?name=111&b=456" class='btn_to'>跳转首页123</router-link>
        <router-link to="/app/456?b=xixixi" class='btn_to'>跳转首页456</router-link>
        <router-link :to="{name: 'login'}" class='btn_to'>跳转登录页</router-link> -->
        <transition name="fade">
          <router-view></router-view>
        </transition>
        <!-- <notification content='test notification'>通过模板方式调用公共组件</notification> -->
        <Footer></Footer>

    </div>
</template>

<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
// import Todo from './todo/todo.vue'

export default {
  name: 'App',
  components: {
    [Header.name]: Header,
    [Footer.name]: Footer
  },
  data () {
    return {
      text: 'abc'
    }
  },
  computed: {

  },
  methods: {
    notify () { // 通过js方式调用公共组件
      this.$notify({
        content: 'test notification'
        // autoClose: '4000'
      })
    }
  },
  mounted () {

  },
  updated () {

  }
}
</script>

<style lang='stylus' scoped>
#app {
    position: relative;height: 100%;left: 0;top: 0;
    .cover {
        position: absolute;left: 0;top: 0;right: 0;bottom: 0;background-color: #999;opacity: 0.9;z-index: -1;
    }
}
.router-link-exact-active {color: red;}
.btn_to {border: 1px solid orange;border-radius: 4px;padding: 2px 4px;}

// vue transition   --start--
.fade-enter, .fade-leave-to {opacity: 0;}
.fade-enter-active, .fade-leave-active {transition: opacity .5s}
// vue transition   --end--
</style>
