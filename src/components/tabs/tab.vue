<template>
  <li class='tab'
    :class='{active: isActive, cursor: isActive}'
    @click='toggle'
  >
    <span>{{label}}</span>

  </li>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    index: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    isActive () {
      return this.index == this.$parent.value
    }
  },
  data () {
    return {

    }
  },
  methods: {
    toggle () {
      this.$parent.tabToggle(this.index)
    }
  },
  created () {
    this.$parent.panes.push(this)
  },
  mounted () {

  }
}
</script>

<style lang="stylus" scoped>
.tab
  list-style none
  line-height 40px
  margin-right 30px
  position relative
  bottom -2px
  cursor pointer
  &.active
    border-bottom 2px solid blue
  &:last-child
    margin-right 0
  &.cursor
    cursor: auto
</style>
