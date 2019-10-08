<template>
  <div class='tabs'>
    <ul class='tabs-header'>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    tabToggle (index) {
      this.$emit('changeTab', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tabs-header
  display flex
  list-style none
  margin 0
  padding 0

</style>
