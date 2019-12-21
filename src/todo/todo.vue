<template>
    <section class="section">
      <div class="tables-container">
        <tabs class="tabs"
          :value='tabs_value'
          @changeTab='changeTabHandle'
        >
          <tab
            v-for="state in states"
            :index='state.id'
            :label='state.name'
            :key="state.id"
          ></tab>
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
      <div class="helper">
        <span class="left">{{uncompletedNum}}条未完成事务</span>
        <button class="clearBtn"
            @click="clearBtn"
        >清空已完成的事务</button>
    </div>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Items from './todo/items.vue'

let id = 0

export default {
  metaInfo: {
    title: 'Todo App'
  },
  name: 'Todo',
  components: {
    [Items.name]: Items
  },
  data () {
    return {
      filter: 'all',
      todos_id: 0, // todos列表默认展示所有
      tabs_value: '0', // tabs组件默认展示
      states: [
        {id: 0, des: 'all', name: '所有事务'},
        {id: 1, des: 'active', name: '未完成事务'},
        {id: 2, des: 'completed', name: '已完成事务'}
      ],
      selectState: 0
    }
  },
  computed: {
    ...mapState({
      todos: 'todos'
    }),
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
    ...mapActions([
      'fetchTodos'
    ]),
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
    changeTabHandle (id) {
      this.tabs_value = id
      this.todos_id = id
    },
    clearBtn () {
      this.todos = this.todos.filter((v, i, arr) => !v.isCompleted)
    }
  },
  mounted () {
    this.fetchTodos()
  },
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
    /* if (global.confirm('are you sure ? ')) {
      next();
    } */
    next()
  }
}
</script>

<style lang="stylus" scoped>
.section {
    width: 570px;margin: 0 auto;box-shadow: 0 0 5px #666;position relative;background #fff;
    .add-input {
        width: 100%;font-size: 24px;font-weight: inherit;font-family: inherit;line-height: 1.4em;border: 0;box-shadow: inset 0 -2px 1px 0 rgba(0,0,0,0.03);box-sizing: border-box;font-smoothing: antialiased;padding: 16px 16px 16px 60px;
    }
}
.tables-container
  background-color #fff;padding 0 20px;
  .tabs
    padding 0;border-bottom 2px solid #ededed;
.helper {
    font-weight: 100;display: flex;justify-content: space-between;padding: 5px 0;line-height: 30px;background-color: #fff;font-size: 14px;font-smoothing: antialiased;
    .clearBtn {
        background-color: inherit;font-color: inherit;
    }
}
.left, .clearBtn {
    padding: 0 10px;box-sizing: border-box;
}
.clearBtn {
    cursor: pointer;
}
</style>
