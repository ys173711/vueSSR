<docs>
# 这是一个header组件
</docs>

<template>
    <header class="index-header">
        <h1>{{title}}</h1>
    </header>
</template>

<script>

export default {
  name: 'Header',
  components: {

  },
  data () {
    return {
      title: undefined,
      age: 18
    }
  },
  computed: {

  },
  created () {
    this.title = 'YsTodo';
  },
  mounted () {
    this.print();
  },
  methods: {
    print () {

    }

  }

}
</script>

<style lang="stylus">
.index-header {
    text-align: center;
    h1 {
        font-size: 100px;color: rgba(175,47,47,0.4);font-weight: 100px;margin-bottom: 20px;padding-top: 20px;
    }
}
</style>

<docs>
    这是Header组件
</docs>
