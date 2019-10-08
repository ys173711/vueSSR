<template>
    <section class="section">
      <div class="tables-container">
        <tabs
          :value='tabs_value'
          @changeTab='changeTab'
        >
          <tab index='1' label='tab1'></tab>
          <tab index='2'>
            <span>tab2</span>
          </tab>
          <tab index='3' label='tab3'></tab>
        </tabs>
      </div>
      <input type="text" class="add-input" autofocus='autofocus' placeholder="接下来要做什么？"
            @keyup.enter="addTodo"
        >
      <Items
        v-for="todo in todos_show"
        :key="todo.id"
        :todo="todo"
        @del='deleteTodo'
      ></Items>
      <todo-tabs
        :uncompletedNum='uncompletedNum'
        @showList='filter_showList'
        @clearUncompleted='clearUncompletedData'
      ></todo-tabs>
    </section>
</template>

<script>
import Items from './todo/items.vue'
import TodoTabs from './todo/todo-tabs.vue'

let id = 0

export default {
  metaInfo: {
    title: 'Todo App'
  },
  name: 'Todo',
  components: {
    [Items.name]: Items,
    [TodoTabs.name]: TodoTabs
  },
  props: {
    id: {required: true, type: String}
  },
  data () {
    return {
      todos: [],
      filter: 'all',
      todos_id: 0,
      tabs_value: '1'
    }
  },
  computed: {
    uncompletedNum () {
      let obj = this.todos.reduce(
        (pre, v, i, arr) => {
          if (!v.isCompleted) {
            pre.count++
          }
          return pre
        }
        , {count: 0}
      )
      return obj.count
    },
    todos_show () {
      if (this.todos_id == 0) {
        return this.todos
      } else if (this.todos_id == 1) {
        return this.todos.filter((v, i, arr) => !v.isCompleted)
      } else if (this.todos_id == 2) {
        return this.todos.filter((v, i, arr) => v.isCompleted)
      } else {
        return this.todos
      }
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        isCompleted: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(
        (v, i) => v.id == id
      ), 1)
    },
    filter_showList (id) {
      this.todos_id = id
    },
    clearUncompletedData () {
      this.todos = this.todos.filter((v, i, arr) => !v.isCompleted)
    },
    changeTab (i) {
      this.tabs_value = i
    }
  },
  mounted () {

  },
  // 组件内路由钩子
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter invoked');
    next(vm => {
      console.log('当前组件的路由id为 ' + vm.id);
    });
  },
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate invoked');
    next();
  },
  beforeRouteLeave (to, from, next) { // 控制用户页面离开行为
    console.log('beforeRouteLeave invoked');
    if (global.confirm('are you sure ? ')) {
      next();
    }
  }
}
</script>

<style lang="stylus" scoped>
.section {
    width: 570px;margin: 0 auto;box-shadow: 0 0 5px #666;position relative;background #fff;
    .add-input {
        width: 100%;font-size: 24px;font-weight: inherit;font-family: inherit;line-height: 1.4em;border: 0;box-shadow: inset 0 -2px 1px 0 rgba(0,0,0,0.03);box-sizing: border-box;font-smoothing: antialiased;padding: 16px 16px 16px 60px;margin-top 42px;
    }
}
.tables-container
  background-color #fff;border-bottom 2px solid #ededed;position absolute;left 15px; right 15px;padding 0;
  .tabs
    padding 0;
</style>
