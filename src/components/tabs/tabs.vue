
<script>
export default {
  render () {
    let contents = this.panes.map(vm => {
      return vm.isActive ? vm.$slots.default : null
    })
    return (
      <div class='tabs'>
        <ul class='tabs-header'>
          {this.$slots.default}
        </ul>
        <div class="tabs-content">
          {contents}
        </div>
      </div>
    )
  },
  name: 'Tabs',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      panes: []
    }
  },
  computed: {

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
.tabs
  display block
.tabs-header
  display flex
  list-style none
  margin 0
  padding 0
  .tabs-content
    min-height 20px;background-color orange;
</style>
