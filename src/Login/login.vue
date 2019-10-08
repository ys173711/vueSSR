<template>
  <div class="login">
    <div class="wrapper">
      <label for="username">
        <input type="text" id="username" placeholder="请输入用户名">
      </label>
      <label for="password">
        <input type="text" id="password" placeholder="请输入密码">
      </label>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Login Page'
  },
  name: 'Login',
  props: {
    // id: {required: true, type: String}
  }
}
</script>

<style lang="css">
/* .login {position: absolute;width: 100%;height: 100%;left: 0;top: 0;z-index: 100;background-color: rgba(239,239,239,0.5);} */
.wrapper {width: 200px;height: 60px;background-color: orange;position: absolute;left: 50%;top: 50%;margin-left: -100px;margin-top: -30px;}
</style>
